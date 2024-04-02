import React from "react"
import { Emoji } from "@/types"
import type { User } from "firebase/auth"

import { cn } from "@/lib/utils"

import { emojis } from "./emoji"
import { Button } from "./ui/button"

type ReactionButtonProps = {
  emoji: Emoji // Identifies the emoji types
  count: number
  user: User | null | undefined
  checked: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const ReactionButton: React.FC<ReactionButtonProps> = ({
  emoji,
  count,
  user,
  checked,
  ...props
}) => {
  const handleClick = async () => {}

  if (count < 1) return null

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("gap-2 rounded-full", checked && "border-primary")}
      disabled={!user}
      onClick={handleClick}
      {...props}
    >
      <span className="sr-only">{emoji}</span>
      <span>{emojis[emoji]}</span>
      <span>{count}</span>
    </Button>
  )
}
export default ReactionButton
