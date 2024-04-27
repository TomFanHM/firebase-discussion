import React from "react";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";
import { useSignOut } from "react-firebase-hooks/auth";

import { SignOutSvg } from "./svg";
import { Button } from "./ui/button";

const SignOutButton: React.FC = () => {
  const { auth } = useFirebaseDiscussion();
  const [signOut, loading] = useSignOut(auth);

  return (
    <Button variant="ghost" onClick={() => signOut()} disabled={loading}>
      <SignOutSvg className="mr-2 h-4 w-4 fill-current" aria-label="hidden" />
      Sign out
    </Button>
  );
};
export default SignOutButton;
