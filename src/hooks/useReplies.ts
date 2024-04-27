import { useEffect, useState } from "react";
import { config } from "@/config";
import { Reply } from "@/types";
import type { Firestore } from "firebase/firestore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useReplies = (
  firestore: Firestore,
  identifier: { discussion: string; comment: string }
) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(
          firestore,
          `${config.collection}/${identifier.discussion}/comments/${identifier.comment}/replies`
        ),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const fetchedReplies = snapshot.docs.map((doc) => {
          const parse = Reply.parse(doc.data());
          return {
            id: doc.id,
            ...parse,
          };
        });
        setReplies(fetchedReplies);
        setLoading(false);
      },
      (error) => {
        console.log("🚀 ~ useEffect ~ error:", error);
      }
    );

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [firestore, identifier]);

  return { replies, loading };
};

export default useReplies;
