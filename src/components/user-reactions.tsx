import React, { useMemo } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { Action, Emoji, Reactions } from "@/types"
import { useAuthState } from "react-firebase-hooks/auth"

import { generateDocumentPath } from "@/lib/generateDocumentPath"
import { reactionsToCountMap } from "@/lib/reactionsToCountMap"
import { updateReactions } from "@/lib/updateReactions"
import { cn } from "@/lib/utils"

import { emojis } from "./emoji"
import { Button } from "./ui/button"

type UserReactionsProps = {
  reactions: Reactions
  align: "start" | "center" | "end"
  action: Action
}

const UserReactions: React.FC<UserReactionsProps> = ({
  reactions,
  align,
  action,
}) => {
  const { firestore, auth } = useFirebaseDiscussion()
  // User
  const [user] = useAuthState(auth)
  // User reactions
  const emojiCountMap = useMemo<Record<Emoji, number>>(() => {
    return reactionsToCountMap(reactions)
  }, [reactions])
  // User actions
  const handleClick = async (selectedEmoji: Emoji) => {
    try {
      const success = await updateReactions({
        firestore,
        user,
        path: generateDocumentPath(action),
        selectedEmoji,
      })
      console.log(success)
    } catch (error) {
      console.log("🚀 ~ handleClick ~ error:", error)
    }
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        align === "start" && "justify-start",
        align === "center" && "justify-center",
        align === "end" && "justify-end"
      )}
    >
      {Object.entries(emojiCountMap).map(([emoji, count]) => {
        if (count > 1000) return null
        return (
          <Button
            key={emoji}
            variant="outline"
            size="sm"
            className={cn("gap-2 rounded-full")}
            disabled={!user}
            onClick={() => handleClick(emoji as Emoji)}
          >
            <span className="sr-only">{emoji}</span>
            <span>{emojis[emoji as Emoji]}</span>
            <span>{count}</span>
          </Button>
        )
      })}
    </div>
  )
}
export default UserReactions
