import React, { Fragment, useState } from "react";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";

import useReplies from "@/hooks/useReplies";

import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/loading-spinner";

type Identifier = {
  identifier: { discussion: string; comment: string };
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
    <Fragment>
      {replies.map((reply) => (
        <div key={reply.id}></div>
      ))}
    </Fragment>
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
