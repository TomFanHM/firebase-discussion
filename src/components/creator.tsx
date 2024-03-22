import React, { Fragment } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"

import useUserProfile from "@/hooks/useUserProfile"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"

type CreatorProps = {
  uid: string
}

const Creator: React.FC<CreatorProps> = ({ uid }) => {
  const { firestore } = useFirebaseDiscussion()
  const { profile, loading } = useUserProfile(firestore, "users", uid)

  if (loading)
    return (
      <Fragment>
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-20" />
      </Fragment>
    )
  return (
    <Fragment>
      <Avatar>
        <AvatarImage
          src={profile?.photoURL}
          alt={profile?.displayName || `@${uid}`}
        />
        <AvatarFallback>{profile?.displayName || "U"}</AvatarFallback>
      </Avatar>
      <span className="text-ellipsis font-semibold">
        {profile?.displayName || `@${uid}`}
      </span>
    </Fragment>
  )
}
export default Creator
