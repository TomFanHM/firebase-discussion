import React from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"

import useComments from "@/hooks/useComments"

import CommentCard from "./comment-card"
import { Skeleton } from "./ui/skeleton"

const Comments: React.FC = () => {
  const { firestore, identifier } = useFirebaseDiscussion()
  const { comments, loading } = useComments(firestore, identifier)

  if (loading) return <Skeleton className="h-6 w-full" />

  return (
    <section className="flex w-full flex-col gap-4">
      {comments.map((comment, i) => (
        <CommentCard key={i} data={comment} />
      ))}
    </section>
  )
}
export default Comments
