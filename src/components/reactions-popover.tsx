import React, { useState } from "react"
import { Emoji, Reactions } from "@/types"
import { User } from "firebase/auth"

import { selectedEmoji } from "@/lib/selectedEmoji"
import { cn, getObjectKeys } from "@/lib/utils"

import { emojis } from "./emoji"
import { SmileSvg } from "./svg"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

type ReactionsPopoverProps = {
  reactions: Reactions
  user: User | null | undefined
  category: "discussion" | "comment" | "reply"
  handleClick: (selectedEmoji: Emoji) => Promise<void>
}

const ReactionsPopover: React.FC<ReactionsPopoverProps> = ({
  reactions,
  user,
  category,
  handleClick,
}) => {
  const [picked, setPicked] = useState<string | null>(null)

  const handleHover = (emoji: Emoji) => {
    setPicked(emoji)
  }

  const handleLeave = () => {
    setPicked(null)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <SmileSvg className="h-4 w-4 fill-current" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-60"
        align={category === "discussion" ? "center" : "start"}
      >
        <div className="border-b pb-2 text-popover-foreground/70">
          {user ? (
            <p>{picked ? picked : "Pick your reaction."}</p>
          ) : (
            <p>Sign in to add your reaction.</p>
          )}
        </div>
        <div className="mt-2 grid grid-cols-4 place-items-center gap-2">
          {getObjectKeys(emojis).map((emoji) => (
            <Button
              key={emoji}
              variant="outline"
              size="icon"
              onMouseEnter={() => handleHover(emoji)}
              onMouseLeave={handleLeave}
              className={cn(
                "rounded-full",
                selectedEmoji(user, reactions, emoji) && "border-primary"
              )}
              disabled={!user}
              onClick={() => handleClick(emoji)}
            >
              <span className="sr-only">{emoji}</span>
              {emojis[emoji]}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
export default ReactionsPopover
