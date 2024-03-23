import React, { Fragment, lazy, Suspense, useEffect, useState } from "react"
import { config } from "@/config"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { Status } from "@/types"

import { createDiscussion } from "@/lib/createDiscussion"

import { LoadingSpinner } from "./ui/loading-spinner"
import { Skeleton } from "./ui/skeleton"

const CommentInput = lazy(() => import("./comment-input"))
const Comments = lazy(() => import("./comments"))

const PendingInterface = () => {
  return (
    <div className="grid place-items-center gap-4">
      <LoadingSpinner size={24} />
      <span className="whitespace-nowrap text-center text-sm text-foreground/70">
        Loading Comments ...
      </span>
    </div>
  )
}

const ErrorInterface = () => {
  return (
    <div className="grid place-items-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <span className="whitespace-nowrap text-center text-sm text-foreground/70">
        Oops! Something went wrong. Please try reloading the page.
      </span>
    </div>
  )
}

const Container: React.FC = () => {
  const { firestore, identifier } = useFirebaseDiscussion()
  const [status, setStatus] = useState<Status>("pending")

  useEffect(() => {
    async function initial() {
      try {
        const { doc, getDoc } = await import("firebase/firestore") // Lazy import
        const docRef = doc(firestore, config.collection, identifier)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) await createDiscussion({ firestore, identifier })
        setStatus("success")
      } catch (error) {
        console.log("🚀 ~ initial ~ error:", error)
        setStatus("error")
      }
    }
    initial()
  }, [firestore, identifier])

  if (status === "pending") return <PendingInterface />
  if (status === "error") return <ErrorInterface />
  return (
    <Fragment>
      <Suspense fallback={<Skeleton className="h-6 w-full" />}>
        <></>
      </Suspense>
      <Suspense fallback={<Skeleton className="h-6 w-full" />}>
        <Comments />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-6 w-full" />}>
        <CommentInput />
      </Suspense>
    </Fragment>
  )
}
export default Container
