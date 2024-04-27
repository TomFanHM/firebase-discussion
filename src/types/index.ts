import { z } from "zod";

export type Status = "pending" | "success" | "error";

export const Timestamp = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
});

export type Timestamp = z.infer<typeof Timestamp>;

export const Emoji = z.union([
  z.literal("like"),
  z.literal("dislike"),
  z.literal("laugh"),
  z.literal("hooray"),
  z.literal("confused"),
  z.literal("love"),
  z.literal("rocket"),
  z.literal("eyes"),
]);

export type Emoji = z.infer<typeof Emoji>;

export const UserVote = z
  .record(Emoji, z.boolean().optional())
  .optional()
  .default({});

export type UserVote = z.infer<typeof UserVote>;

export const Reactions = z.record(z.string(), UserVote); // User id, {Emoji: boolean}

export type Reactions = z.infer<typeof Reactions>;

export const Discussion = z.object({
  reactions: Reactions.optional().default({}),
  comments: z.number().optional().default(0),
  replies: z.number().optional().default(0),
});

export type Discussion = z.infer<typeof Discussion>;

export const Comment = z.object({
  userId: z.string(),
  createdAt: Timestamp,
  content: z.string(),
  reactions: Reactions,
  replies: z.number(),
});

export type Comment = z.infer<typeof Comment>;

export const Reply = z.object({
  userId: z.string(),
  createdAt: Timestamp,
  content: z.string(),
  reactions: Reactions,
});

export type Reply = z.infer<typeof Reply>;

export const Profile = z.object({
  displayName: z.string(),
  photoURL: z.string(),
});

export type Profile = z.infer<typeof Profile>;

export type Action =
  | { category: "discussion"; identifier: { discussion: string } }
  | { category: "comment"; identifier: { discussion: string; comment: string } }
  | {
      category: "reply";
      identifier: { discussion: string; comment: string; reply: string };
    };
