import React from "react"

import {
  FirebaseDiscussionContext,
  FirebaseDiscussionContextType,
} from "./firebase-discussion-context"

type FirebaseDiscussionProviderProps = {
  children: React.ReactNode
} & FirebaseDiscussionContextType

export const FirebaseDiscussionProvider: React.FC<
  FirebaseDiscussionProviderProps
> = ({ children, ...rest }) => {
  return (
    <FirebaseDiscussionContext.Provider value={{ ...rest }}>
      {children}
    </FirebaseDiscussionContext.Provider>
  )
}
