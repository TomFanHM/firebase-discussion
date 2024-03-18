import React, { Suspense } from "react"
import { FirebaseDiscussionProvider } from "@/context"
import type { Auth } from "firebase/auth"
import type { Firestore } from "firebase/firestore"

import Container from "./container"
import LoadingFallback from "./loading-fallback"

type FirebaseDiscussionProps = {
  firestore: Firestore
  auth: Auth
  usersCollection: string
  identifier: string
  customFallbackImagePath?: string
}

const FirebaseDiscuss = React.forwardRef<HTMLElement, FirebaseDiscussionProps>(
  (
    { firestore, auth, usersCollection, identifier, customFallbackImagePath },
    ref
  ) => {
    return (
      <section className="mx-auto w-full" ref={ref}>
        <Suspense
          fallback={
            <LoadingFallback
              customFallbackImagePath={customFallbackImagePath}
            />
          }
        >
          <FirebaseDiscussionProvider
            firestore={firestore}
            auth={auth}
            identifier={identifier}
            usersCollection={usersCollection}
          >
            <div className="flex w-full flex-col items-center gap-8">
              <Container />
            </div>
          </FirebaseDiscussionProvider>
        </Suspense>
      </section>
    )
  }
)

export default FirebaseDiscuss
