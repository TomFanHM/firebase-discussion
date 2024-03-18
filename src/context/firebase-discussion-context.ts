import { createContext, useContext } from "react"
import type { Auth, User } from "firebase/auth"
import type { Firestore } from "firebase/firestore"

export type FirebaseDiscussionContextType = {
  firestore: Firestore
  auth: Auth
  usersCollection: string
  identifier: string
  user: User | null | undefined
}

export const FirebaseDiscussionContext = createContext<
  FirebaseDiscussionContextType | undefined
>(undefined)

export function useFirebaseDiscussion() {
  const context = useContext(FirebaseDiscussionContext)
  if (!context) {
    throw new Error(
      "useFirebaseDiscussion must be used within a FirebaseDiscussProvider"
    )
  }
  return context
}
