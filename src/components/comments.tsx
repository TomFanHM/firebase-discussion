import React, { useMemo } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { Comment } from "@/types"
import DOMPurify from "dompurify"

import { timestampToRelativeTime } from "@/lib/timestampToRelativeTime"
import useComments from "@/hooks/useComments"

import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

type CommentCardProps = {
  data: {
    id: string
  } & Comment
}

const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
  const safeHtml = useMemo(() => {
    return DOMPurify.sanitize(data.content)
  }, [data])
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
        <div
          className="prose lg:prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: safeHtml,
          }}
        />
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
