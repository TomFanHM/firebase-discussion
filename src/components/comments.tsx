import React, { Fragment } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"

import useComments from "@/hooks/useComments"

import CommentCard from "./comment-card"
import { Skeleton } from "./ui/skeleton"

// Fetch and display comments
const Comments: React.FC = () => {
  const { firestore, identifier } = useFirebaseDiscussion()
  const { comments, loading } = useComments(firestore, identifier)

  if (loading) return <Skeleton className="h-6 w-full" />

  if (comments.length === 0) return null

  return (
    <Fragment>
      <section className="flex w-full flex-col gap-4">
        {comments.map((comment, i) => (
          <CommentCard key={i} data={comment} />
        ))}
      </section>
    </Fragment>
  )
}
export default Comments
