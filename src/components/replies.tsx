import React, { useMemo, useState } from "react";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";
import { Reply } from "@/types";

import { timestampToRelativeTime } from "@/lib/timestampToRelativeTime";
import { cn } from "@/lib/utils";
import useReplies from "@/hooks/useReplies";

import Creator from "./creator";
import MarkdownRenderer from "./markdown-renderer";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/loading-spinner";
import UserReactions from "./user-reactions";

type Identifier = {
  identifier: { discussion: string; comment: string };
};

type ReplyBlockProps = {
  firstElement: boolean;
  data: { id: string } & Reply;
  discussionIdentifier: string;
  commentIdentifier: string;
};

const ReplyBlock: React.FC<ReplyBlockProps> = ({
  firstElement,
  data,
  discussionIdentifier,
  commentIdentifier,
}) => {
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
    <div className="relative py-4">
      {/* Line */}
      <div
        className={cn(
          "absolute start-[19px] w-0.5 bg-border",
          firstElement ? "top-4 h-[calc(100%-1rem)]" : "top-0 h-full"
        )}
      ></div>
      {/* Profile */}
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-2">
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
        {/* Content */}
        <div className="ml-12 mt-6">
          <MarkdownRenderer content={data.content} />
          <div className="mt-6">
            <UserReactions
              key={data.id}
              reactions={data.reactions}
              category="reply"
              action={{
                category: "reply",
                identifier: {
                  discussion: discussionIdentifier,
                  comment: commentIdentifier,
                  reply: data.id,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type FetchRepliesProps = Identifier;

const FetchReplies: React.FC<FetchRepliesProps> = ({ identifier }) => {
  const { firestore } = useFirebaseDiscussion();
  const { replies, loading } = useReplies(firestore, identifier);

  if (loading)
    return (
      <div className="grid place-items-center">
        <LoadingSpinner size={24} />
      </div>
    );

  return (
    <ul className="flex w-full flex-col">
      {replies.map((reply, i) => (
        <li key={i} id={`#${reply.id}`}>
          <ReplyBlock
            firstElement={i === 0}
            data={reply}
            discussionIdentifier={identifier.discussion}
            commentIdentifier={identifier.comment}
          />
        </li>
      ))}
    </ul>
  );
};

type RepliesProps = Identifier & {
  repliesCount: number;
};

const Replies: React.FC<RepliesProps> = ({ identifier, repliesCount }) => {
  const [show, setShow] = useState<boolean>(false);

  if (!show)
    return (
      <div className="grid place-items-center">
        <Button variant="link" onClick={() => setShow(true)}>
          {repliesCount > 1 ? "Show replies" : "Show reply"}
        </Button>
      </div>
    );

  return <FetchReplies identifier={identifier} />;
};
export default Replies;
