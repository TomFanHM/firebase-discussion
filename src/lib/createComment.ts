import { config } from "@/config"
import type { User } from "firebase/auth"
import type { Firestore } from "firebase/firestore"
import {
  collection,
  doc,
  increment,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore"

type CreateCommentParams = {
  firestore: Firestore
  identifier: string
  user: User
  content: string
}

export async function createComment({
  firestore,
  identifier,
  user,
  content,
}: CreateCommentParams): Promise<boolean> {
  const discussRef = doc(firestore, config.collection, identifier)
  const commentsCollectionRef = collection(discussRef, "comments")

  await runTransaction(firestore, async (transaction) => {
    const commentRef = doc(commentsCollectionRef)
    transaction.set(commentRef, {
      userId: user.uid,
      createdAt: serverTimestamp(),
      content: content,
      reactions: {},
      replies: 0,
    })

    transaction.update(discussRef, { comments: increment(1) })
  })

  return true
}
