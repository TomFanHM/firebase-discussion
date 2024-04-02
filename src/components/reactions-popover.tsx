import React, { useState } from "react"
import { Emoji, Reactions } from "@/types"
import { User } from "firebase/auth"

import { selectedEmoji } from "@/lib/selectedEmoji"
import { updateReactions } from "@/lib/updateReactions"
import { cn } from "@/lib/utils"

import { emojis } from "./emoji"
import { SmileSvg } from "./svg"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

type ReactionsPopoverProps = {
  reactions: Reactions
  user: User | null | undefined
  align: "start" | "center" | "end"
}

const ReactionsPopover: React.FC<ReactionsPopoverProps> = ({
  reactions,
  user,
  align,
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
      <PopoverContent className="w-60" align={align}>
        <div className="border-b pb-2 text-popover-foreground/70">
          {user ? (
            <p>{picked ? picked : "Pick your reaction."}</p>
          ) : (
            <p>Sign in to add your reaction.</p>
          )}
        </div>
        <div className="mt-2 grid grid-cols-4 place-items-center gap-2">
          {Object.keys(emojis).map((emoji) => (
            <Button
              key={emoji}
              variant="outline"
              size="icon"
              onMouseEnter={() => handleHover(emoji as Emoji)}
              onMouseLeave={handleLeave}
              className={cn(
                "rounded-full",
                selectedEmoji(user, reactions, emoji as Emoji) &&
                  "border-primary"
              )}
              disabled={!user}
              onClick={() => updateReactions()}
            >
              <span className="sr-only">{emoji}</span>
              {emojis[emoji as Emoji]}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
export default ReactionsPopover
