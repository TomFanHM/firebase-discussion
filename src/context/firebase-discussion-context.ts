import { createContext, useContext } from "react";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

export type FirebaseDiscussionContextType = {
  firestore: Firestore;
  auth: Auth;
  identifier: string;
  usersCollection?: string;
  appleProvider?: boolean;
  googleProvider?: boolean;
  githubProvider?: boolean;
  twitterProvider?: boolean;
  facebookProvider?: boolean;
  microsoftProvider?: boolean;
  customLoginButton?: React.ReactNode;
};

export const FirebaseDiscussionContext = createContext<
  FirebaseDiscussionContextType | undefined
>(undefined);

export function useFirebaseDiscussion() {
  const context = useContext(FirebaseDiscussionContext);
  if (!context) {
    throw new Error(
      "useFirebaseDiscussion must be used within a FirebaseDiscussProvider"
    );
  }
  return context;
}
