import React, { Fragment } from "react";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";

import useReplies from "@/hooks/useReplies";

type RepliesProps = {
  identifier: { discussion: string; comment: string };
};

const Replies: React.FC<RepliesProps> = ({ identifier }) => {
  const { firestore } = useFirebaseDiscussion();
  const { replies, loading } = useReplies(firestore, identifier);

  if (loading) return <span>loading</span>;

  return <Fragment></Fragment>;
};
export default Replies;
