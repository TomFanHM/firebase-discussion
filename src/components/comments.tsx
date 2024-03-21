import React, { useMemo } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { Comment } from "@/types"

import { timestampToRelativeTime } from "@/lib/timestampToRelativeTime"
import useComments from "@/hooks/useComments"

import Creator from "./creator"
import MarkdownRenderer from "./markdown-renderer"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

type CommentCardProps = {
  data: {
    id: string
  } & Comment
}

const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
  const formatTime = useMemo(() => {
    const date = new Date(
      data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1000000
    )
    const title = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
      timeZone: "GMT",
    })
    const datetime = date.toISOString()
    const relativeTime = timestampToRelativeTime(data.createdAt)
    return { title, datetime, relativeTime }
  }, [data])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Creator uid={data.userId} />
          <span className="text-sm text-muted-foreground">
            <time
              className="whitespace-nowrap"
              title={formatTime.title}
              dateTime={formatTime.datetime}
            >
              {formatTime.relativeTime}
            </time>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <MarkdownRenderer content={data.content} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between gap-2">
          {/* Reactions */}
          <div></div>
          {/* Replies */}
          <div className="whitespace-nowrap">
            <span className="text-sm text-muted-foreground">
              {data.replies} {data.replies > 1 ? "replies" : "reply"}
            </span>
          </div>
        </div>
      </CardFooter>
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
