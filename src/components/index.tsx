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
  // OAuth
  loginWithApple?: boolean
  loginWithFacebook?: boolean
  loginWithGithub?: boolean
  loginWithGoogle?: boolean
  loginWithMicrosoft?: boolean
  loginWithTwitter?: boolean
}

const FirebaseDiscuss = React.forwardRef<HTMLElement, FirebaseDiscussionProps>(
  ({ customFallbackImagePath, ...props }, ref) => {
    return (
      <section className="mx-auto w-full p-4" ref={ref}>
        <Suspense
          fallback={
            <LoadingFallback
              customFallbackImagePath={customFallbackImagePath}
            />
          }
        >
          <FirebaseDiscussionProvider {...props}>
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
