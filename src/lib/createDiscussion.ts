import { config } from "@/config"
import { Discuss } from "@/types"
import { doc, setDoc, type Firestore } from "firebase/firestore"

type CreateDiscussionParmas = {
  firestore: Firestore
  identifier: string
}
export async function createDiscussion({
  firestore,
  identifier,
}: CreateDiscussionParmas) {
  const docRef = doc(firestore, config.collection, identifier)
  const temp: Discuss = {
    reactions: {},
    comments: 0,
    replies: 0,
  }
  await setDoc(docRef, temp)
}
