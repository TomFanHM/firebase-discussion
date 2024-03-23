import React from "react"
import type { Auth } from "firebase/auth"
import type { Firestore } from "firebase/firestore"

import { FirebaseDiscussionContext } from "./firebase-discussion-context"

type FirebaseDiscussionProviderProps = {
  firestore: Firestore
  auth: Auth
  usersCollection: string
  identifier: string
  children: React.ReactNode
}

export const FirebaseDiscussionProvider: React.FC<
  FirebaseDiscussionProviderProps
> = ({ auth, children, ...rest }) => {
  return (
    <FirebaseDiscussionContext.Provider value={{ auth, ...rest }}>
      {children}
    </FirebaseDiscussionContext.Provider>
  )
}
