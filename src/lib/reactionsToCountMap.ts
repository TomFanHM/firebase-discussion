import { Emoji, Reactions } from "@/types";

/**
 * [x: string]: Partial<Record<"like" | "dislike" | "laugh" | "hooray" | "confused" | "love" | "rocket" | "eyes", boolean | undefined>>
 * Object.values => Partial<Record<"like" | "dislike" | "laugh" | "hooray" | "confused" | "love" | "rocket" | "eyes", boolean | undefined>>[]
 */

export function reactionsToCountMap(
  reactions: Reactions
): Record<Emoji, number> {
  const temp: Record<Emoji, number> = {
    like: 0,
    dislike: 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    love: 0,
    rocket: 0,
    eyes: 0,
  };

  for (const userReactions of Object.values(reactions)) {
    for (const emoji in userReactions) {
      if (userReactions[emoji as Emoji]) {
        temp[emoji as Emoji]++;
      }
    }
  }

  return temp;
}
