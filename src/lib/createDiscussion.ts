import { config } from "@/config"
import { Discussion } from "@/types"
import { doc, setDoc, type Firestore } from "firebase/firestore"

type CreateDiscussionParmas = {
  firestore: Firestore
  identifier: string
}

export async function createDiscussion({
  firestore,
  identifier,
}: CreateDiscussionParmas): Promise<void> {
  const docRef = doc(firestore, config.collection, identifier)
  const temp: Discussion = {
    reactions: {},
    comments: 0,
    replies: 0,
  }
  await setDoc(docRef, temp)
}
