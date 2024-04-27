import { Emoji } from "@/types";
import type { User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

type UpdateReactionsParams = {
  firestore: Firestore;
  user: User | null | undefined;
  path: string;
  selectedEmoji: Emoji;
  like: boolean;
};

export async function updateReactions({
  firestore,
  user,
  path,
  selectedEmoji,
  like,
}: UpdateReactionsParams): Promise<boolean> {
  try {
    if (!user) return false;
    const docRef = doc(firestore, path);

    await updateDoc(docRef, {
      [`reactions.${user.uid}.${selectedEmoji}`]: like,
    });

    return true;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
  return false;
}
