import React, { useMemo } from "react";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";
import { Comment } from "@/types";

import { timestampToRelativeTime } from "@/lib/timestampToRelativeTime";

import Creator from "./creator";
import MarkdownRenderer from "./markdown-renderer";
import Replies from "./replies";
import ReplyInput from "./reply-input";
import Share from "./share";
import { Card, CardContent, CardHeader } from "./ui/card";
import UserReactions from "./user-reactions";

type CommentCardProps = {
  data: {
    id: string;
  } & Comment;
};

const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
  const { identifier } = useFirebaseDiscussion();

  const format = useMemo(() => {
    const date = new Date(
      data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1000000
    );
    const title = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
      timeZone: "GMT",
    });
    const datetime = date.toISOString();
    const relativeTime = timestampToRelativeTime(data.createdAt);
    return { title, datetime, relativeTime };
  }, [data]);

  return (
    <Card>
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
        <div className="mt-6 flex w-full items-center justify-between gap-2">
          {/* Reactions */}
          <UserReactions
            key={data.id}
            reactions={data.reactions}
            category="comment"
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
      </CardContent>
      {/* Replies */}
      {data.replies > 0 && (
        <CardContent className="border-t py-4">
          <Replies
            identifier={{ discussion: identifier, comment: data.id }}
            repliesCount={data.replies}
          />
        </CardContent>
      )}
      {/* Input */}
      <ReplyInput identifier={{ discussion: identifier, comment: data.id }} />
    </Card>
  );
};

export default CommentCard;
