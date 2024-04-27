import { Emoji, Reactions } from "@/types";
import type { User } from "firebase/auth";

// Check if the user has selected an emoji
export function selectedEmoji(
  user: User | null | undefined,
  reactions: Reactions,
  emoji: Emoji
): boolean {
  // If the user is not logged in, return false
  if (!user) return false;
  // If the user has not reacted to any emoji, return false
  if (!reactions[user.uid]) return false;
  // If the user has not reacted to the emoji, return false
  if (!reactions[user.uid][emoji]) return false;
  return true;
}
