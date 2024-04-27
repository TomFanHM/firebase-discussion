import React, { Fragment } from "react";
import { config } from "@/config";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";
import { Discussion } from "@/types";

import useDocument from "@/hooks/useDocument";

import { Skeleton } from "./ui/skeleton";
import UserReactions from "./user-reactions";

const parser = (el: unknown): Discussion => {
  return Discussion.parse(el);
};

const Header: React.FC = () => {
  const { firestore, identifier } = useFirebaseDiscussion();

  const { docData, loading } = useDocument<Discussion>({
    firestore: firestore,
    collectionName: config.collection,
    docId: identifier,
    parser: parser,
  });

  if (loading) return <Skeleton className="h-6 w-full" />;
  if (!docData) return null;

  return (
    <Fragment>
      <div className="relative mx-auto flex items-center justify-center">
        <UserReactions
          reactions={docData.reactions}
          category="discussion"
          action={{
            category: "discussion",
            identifier: { discussion: identifier },
          }}
        />
      </div>

      {/* Details */}
      <div className="flex w-full items-center gap-2">
        <h4 className="font-semibold">
          {docData.comments} {docData.comments > 1 ? "comments" : "comment"}
        </h4>
        <h4 className="font-semibold">·</h4>
        <h4 className="font-semibold">
          {docData.replies} {docData.replies > 1 ? "replies" : "reply"}
        </h4>
      </div>
    </Fragment>
  );
};

export default Header;
