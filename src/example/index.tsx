import React from "react";
import FirebaseDiscussion from "@/components";

import { cn } from "@/lib/utils";

import { auth, firestore } from "./firebase";

type ExampleProps = {
  theme: "light" | "dark";
  appleProvider: boolean;
  facebookProvider: boolean;
  githubProvider: boolean;
  googleProvider: boolean;
  microsoftProvider: boolean;
  twitterProvider: boolean;
};

const Example: React.FC<ExampleProps> = ({
  theme = "light",
  appleProvider,
  facebookProvider,
  githubProvider,
  googleProvider,
  microsoftProvider,
  twitterProvider,
}) => {
  return (
    <div className={cn(theme, "relative")}>
      <FirebaseDiscussion
        firestore={firestore}
        auth={auth}
        identifier="test-discussion"
        appleProvider={appleProvider}
        facebookProvider={facebookProvider}
        githubProvider={githubProvider}
        googleProvider={googleProvider}
        microsoftProvider={microsoftProvider}
        twitterProvider={twitterProvider}
      />
    </div>
  );
};
export default Example;
