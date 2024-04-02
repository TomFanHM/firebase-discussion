import React, { useMemo } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { Emoji, Reactions } from "@/types"
import { useAuthState } from "react-firebase-hooks/auth"

import { selectedEmoji } from "@/lib/selectedEmoji"
import { cn } from "@/lib/utils"

import ReactionButton from "./reaction-button"
import ReactionsPopover from "./reactions-popover"

type ReactionsContainerProps = {
  reactions: Reactions
  align: "start" | "center" | "end"
}

const ReactionsContainer: React.FC<ReactionsContainerProps> = ({
  align,
  reactions,
}) => {
  const { auth } = useFirebaseDiscussion()
  // User
  const [user] = useAuthState(auth)

  const emojiCountMap = useMemo<Record<Emoji, number>>(() => {
    const temp: Record<Emoji, number> = {
      like: 0,
      dislike: 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      love: 0,
      rocket: 0,
      eyes: 0,
    }

    for (const userReactions of Object.values(reactions)) {
      for (const emoji in userReactions) {
        if (userReactions[emoji as Emoji]) {
          temp[emoji as Emoji]++
        }
      }
    }
    // console.log(temp)
    return temp
  }, [reactions])

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        align === "center" ? "justify-center" : "justify-start"
      )}
    >
      <ReactionsPopover reactions={reactions} user={user} align={align} />
      {Object.entries(emojiCountMap).map(([emoji, count]) => (
        <ReactionButton
          key={emoji}
          emoji={emoji as Emoji}
          count={count}
          user={user}
          checked={selectedEmoji(user, reactions, emoji as Emoji)}
        />
      ))}
    </div>
  )
}
export default ReactionsContainer
