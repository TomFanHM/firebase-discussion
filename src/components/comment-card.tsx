import React, { useMemo } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { Comment } from "@/types"

import { timestampToRelativeTime } from "@/lib/timestampToRelativeTime"

import Creator from "./creator"
import MarkdownRenderer from "./markdown-renderer"
import Share from "./share"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import UserReactions from "./user-reactions"

type CommentCardProps = {
  data: {
    id: string
  } & Comment
}

const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
  const { identifier } = useFirebaseDiscussion()

  const format = useMemo(() => {
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
    <Card id={data.id}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          {/* Right */}
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <Creator uid={data.userId} />
            <span className="text-sm text-muted-foreground">
              <time
                className="whitespace-nowrap"
                title={format.title}
                dateTime={format.datetime}
              >
                {format.relativeTime}
              </time>
            </span>
          </div>
          {/* Left */}
          <Share id={data.id} />
        </div>
      </CardHeader>
      <CardContent>
        {/* Content Render */}
        <MarkdownRenderer content={data.content} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between gap-2">
          {/* Reactions */}
          <UserReactions
            reactions={data.reactions}
            align="start"
            action={{
              category: "comment",
              identifier: { discussion: identifier, comment: data.id },
            }}
          />
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

export default CommentCard
