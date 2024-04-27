import React, { Fragment } from "react";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";

type RepliesProps = {};

const Replies: React.FC<RepliesProps> = () => {
  const { firestore, identifier } = useFirebaseDiscussion();

  return <Fragment></Fragment>;
};
export default Replies;
