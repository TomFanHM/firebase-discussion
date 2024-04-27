import { useEffect, useState } from "react";
import { config } from "@/config";
import { Comment } from "@/types";
import type { Firestore } from "firebase/firestore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

type CommentDoc = {
  id: string;
} & Comment;

const useComments = (firestore: Firestore, identifier: string) => {
  const [comments, setComments] = useState<CommentDoc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, `${config.collection}/${identifier}/comments`),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const fetchedComments = snapshot.docs.map((doc) => {
          const parse = Comment.parse(doc.data());
          return {
            id: doc.id,
            ...parse,
          };
        });
        setComments(fetchedComments);
        setLoading(false);
      },
      (error) => {
        console.log("🚀 ~ useEffect ~ error:", error);
      }
    );

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [firestore, identifier]);

  return { comments, loading };
};

export default useComments;
