import React, { useMemo } from "react"
import { Reactions } from "@/types"

type ReactionsContainerProps = {
  reactions: Reactions
}

const ReactionsContainer: React.FC<ReactionsContainerProps> = ({
  reactions,
}) => {
  const counts = useMemo(() => {
    let total = 0
    for (const userId in reactions) {
      const userEmojis = reactions[userId]
      for (const vote in userEmojis) {
        if (userEmojis[vote as keyof typeof userEmojis] === true) {
          total += 1
        }
      }
    }
    return total
  }, [reactions])

  return (
    <div className="flex flex-wrap items-center gap-2">
      <h4 className="text-center font-semibold">
        {counts} {`reaction${counts > 1 ? "s" : ""}`}
      </h4>
    </div>
  )
}
export default ReactionsContainer
