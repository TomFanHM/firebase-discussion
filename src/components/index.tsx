import React, { Suspense } from "react"
import { FirebaseDiscussionProvider } from "@/context"
import { FirebaseDiscussionContextType } from "@/context/firebase-discussion-context"

import Container from "./container"
import LoadingFallback from "./loading-fallback"

type FirebaseDiscussionProps = {
  customFallbackImagePath?: string
} & FirebaseDiscussionContextType

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
            <div className="flex w-full flex-col items-center gap-6">
              <Container />
            </div>
          </FirebaseDiscussionProvider>
        </Suspense>
      </section>
    )
  }
)

export default FirebaseDiscuss
