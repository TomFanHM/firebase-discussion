import { config } from "@/config";
import type { User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import {
  collection,
  doc,
  increment,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

type CreateReplyParams = {
  firestore: Firestore;
  identifier: { discussion: string; comment: string };
  user: User;
  content: string;
};

export async function createReply({
  firestore,
  identifier,
  user,
  content,
}: CreateReplyParams): Promise<boolean> {
  const discussionRef = doc(
    firestore,
    config.collection,
    identifier.discussion
  );
  const commentRef = doc(discussionRef, "comments", identifier.comment);
  const repliesCollectionRef = collection(commentRef, "replies");

  await runTransaction(firestore, async (transaction) => {
    const replyRef = doc(repliesCollectionRef);
    transaction.set(replyRef, {
      userId: user.uid,
      createdAt: serverTimestamp(),
      content: content,
      reactions: {},
    });

    // Update the parent comment document to increment the reply count by one.
    transaction.update(commentRef, { replies: increment(1) });
    // Update the parent discussion document to increment the reply count by one.
    transaction.update(discussionRef, { replies: increment(1) });
  });

  return true;
}
