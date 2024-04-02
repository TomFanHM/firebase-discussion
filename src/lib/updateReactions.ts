import { Emoji, Reactions, UserVote } from "@/types"
import type { User } from "firebase/auth"
import type { Firestore } from "firebase/firestore"
import { doc, runTransaction } from "firebase/firestore"

type UpdateReactionsParams = {
  firestore: Firestore
  user: User | null | undefined
  path: string
  selectedEmoji: Emoji
}

export async function updateReactions({
  firestore,
  user,
  path,
  selectedEmoji,
}: UpdateReactionsParams): Promise<boolean> {
  try {
    if (!user) return false
    const docRef = doc(firestore, path)
    await runTransaction(firestore, async (transaction) => {
      // get the document
      const docSnap = await transaction.get(docRef)
      if (!docSnap.exists()) {
        throw "Document does not exist!"
      }
      // get the reactions
      const reactions = Reactions.parse(docSnap.data().reactions)
      // get the user's reactions, possibly undefined
      const userReactions: UserVote = reactions[user.uid] ?? {}
      // set end product
      const updatedReactions = {
        ...userReactions,
        [selectedEmoji]: !userReactions[selectedEmoji],
      }
      // toggle the selected emoji
      transaction.update(docRef, {
        [`reactions.${user.uid}`]: updatedReactions,
      })
    })
    return true
  } catch (error) {
    console.log("🚀 ~ error:", error)
  }
  return false
}
