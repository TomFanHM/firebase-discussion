import React, { useState } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { Action, Emoji, Reactions } from "@/types"
import { useAuthState } from "react-firebase-hooks/auth"

import { generateDocumentPath } from "@/lib/generateDocumentPath"
import { reactionsToCountMap } from "@/lib/reactionsToCountMap"
import { selectedEmoji } from "@/lib/selectedEmoji"
import { updateReactions } from "@/lib/updateReactions"
import { cn } from "@/lib/utils"

import { emojis } from "./emoji"
import ReactionsPopover from "./reactions-popover"
import { Button } from "./ui/button"

type UserReactionsProps = {
  reactions: Reactions
  category: "discussion" | "comment" | "reply"
  action: Action
}

const UserReactions: React.FC<UserReactionsProps> = ({
  reactions,
  category,
  action,
}) => {
  const { firestore, auth } = useFirebaseDiscussion()
  // User
  const [user] = useAuthState(auth)
  // User actions
  // Optimistic UI Updates
  const [optimisticReactions, setOptimisticReactions] =
    useState<Reactions>(reactions)

  const handleClick = async (selectedEmoji: Emoji) => {
    // Skip if user is not signed in
    if (!user) return
    const like = !!optimisticReactions[user.uid]?.[selectedEmoji]
    setOptimisticReactions((prev) => ({
      ...prev,
      [user.uid]: {
        ...prev[user.uid],
        [selectedEmoji]: !like,
      },
    }))
    try {
      const success = await updateReactions({
        firestore,
        user,
        path: generateDocumentPath(action),
        selectedEmoji,
        like: !like,
      })
      if (!success) throw new Error("Failed to update reactions")
    } catch (error) {
      console.log("🚀 ~ handleClick ~ error:", error)
      setOptimisticReactions((prev) => ({
        ...prev,
        [user.uid]: {
          ...prev[user.uid],
          [selectedEmoji]: like,
        },
      }))
    }
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        category === "discussion" ? "justify-center" : "justify-start"
      )}
    >
      {/* Popover */}
      <ReactionsPopover
        reactions={optimisticReactions}
        user={user}
        category={category}
        handleClick={handleClick}
      />
      {/* Buttons */}
      {Object.entries(reactionsToCountMap(optimisticReactions)).map(
        ([emoji, count]) => {
          // Skip if count is less than 1
          if (count < 1) return null
          return (
            <Button
              key={emoji}
              variant="outline"
              size="sm"
              className={cn(
                "gap-2 rounded-full",
                selectedEmoji(user, optimisticReactions, emoji as Emoji) &&
                  "border-primary"
              )}
              disabled={!user}
              onClick={() => handleClick(emoji as Emoji)}
            >
              <span className="sr-only">{emoji}</span>
              <span>{emojis[emoji as Emoji]}</span>
              <span>{count}</span>
            </Button>
          )
        }
      )}
    </div>
  )
}
export default UserReactions
