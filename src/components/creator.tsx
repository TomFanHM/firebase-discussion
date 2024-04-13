import React, { Fragment } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import type { Firestore } from "firebase/firestore"

import useUserProfile from "@/hooks/useUserProfile"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"

const Preloader = () => (
  <Fragment>
    <Skeleton className="h-10 w-10 rounded-full" />
    <Skeleton className="h-6 w-20" />
  </Fragment>
)

// Fallback component for when usersCollection is undefined
const Fallback = ({ uid }: { uid: string }) => (
  <Fragment>
    <Avatar>
      <AvatarImage src="" alt={`@${uid}`} />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
    <span className="text-ellipsis font-semibold">{`@${uid}`}</span>
  </Fragment>
)

type FetchCreatorProps = {
  uid: string
  firestore: Firestore
  usersCollection: string
}

const FetchCreator = ({
  uid,
  firestore,
  usersCollection,
}: FetchCreatorProps) => {
  const { profile, loading } = useUserProfile(firestore, usersCollection, uid)

  if (loading) return <Preloader />
  if (!profile) return <Fallback uid={uid} />

  return (
    <Fragment>
      <Avatar>
        <AvatarImage src={profile.photoURL} alt={profile.displayName} />
        <AvatarFallback>{profile.displayName}</AvatarFallback>
      </Avatar>
      <span className="text-ellipsis font-semibold">{profile.displayName}</span>
    </Fragment>
  )
}

type CreatorProps = {
  uid: string
}

const Creator: React.FC<CreatorProps> = ({ uid }) => {
  const { firestore, usersCollection } = useFirebaseDiscussion()
  if (!usersCollection) return <Fallback uid={uid} />
  return (
    <FetchCreator
      uid={uid}
      firestore={firestore}
      usersCollection={usersCollection}
    />
  )
}
export default Creator
