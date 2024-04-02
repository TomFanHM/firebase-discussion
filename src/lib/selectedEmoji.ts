import { Emoji, Reactions } from "@/types"
import type { User } from "firebase/auth"

export function selectedEmoji(
  user: User | null | undefined,
  reactions: Reactions,
  emoji: Emoji
): boolean {
  if (!user) return false
  if (!reactions[user.uid]) return false
  if (!reactions[user.uid][emoji]) return false
  return true
}
