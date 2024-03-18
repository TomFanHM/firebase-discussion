import React, { useEffect, useState } from "react"
import { config } from "@/config"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { Status } from "@/types"
import { doc, getDoc } from "firebase/firestore"

import { createDiscussion } from "@/lib/createDiscussion"

import LoginButtonGroup from "./login-button-group"
import { LoadingSpinner } from "./ui/loading-spinner"

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

type ContainerProps = {}

const Container: React.FC<ContainerProps> = () => {
  const { firestore, identifier } = useFirebaseDiscussion()
  const [status, setStatus] = useState<Status>("pending")

  useEffect(() => {
    async function initial() {
      try {
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
    <div>
      <LoginButtonGroup />
    </div>
  )
}
export default Container
