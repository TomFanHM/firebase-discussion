import React, { Fragment, lazy, Suspense } from "react";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";

import useComments from "@/hooks/useComments";

import { Skeleton } from "./ui/skeleton";

const CommentCard = lazy(() => import("./comment-card"));

// Fetch and display comments
const Comments: React.FC = () => {
  const { firestore, identifier } = useFirebaseDiscussion();
  const { comments, loading } = useComments(firestore, identifier);

  if (loading) return <Skeleton className="h-6 w-full" />;

  if (comments.length === 0) return null;

  return (
    <Fragment>
      <section className="flex w-full flex-col gap-4">
        {comments.map((comment, i) => (
          <Suspense key={i} fallback={null}>
            <CommentCard data={comment} />
          </Suspense>
        ))}
      </section>
    </Fragment>
  );
};
export default Comments;
