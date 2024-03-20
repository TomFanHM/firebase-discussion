import React from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { Comment } from "@/types"

import { timestampToRelativeTime } from "@/lib/timestampToRelativeTime"
import useComments from "@/hooks/useComments"

import MarkdownRenderer from "./markdown-renderer"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

type CommentCardProps = {
  data: {
    id: string
  } & Comment
}

const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <span>
            <time>{timestampToRelativeTime(data.createdAt)}</time>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <MarkdownRenderer content={data.content} />
      </CardContent>
    </Card>
  )
}

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
