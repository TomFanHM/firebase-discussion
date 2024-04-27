import React from "react";
import FirebaseDiscussion from "@/components";

import { auth, firestore } from "./firebase";

type ExampleProps = {
  appleProvider: boolean;
  facebookProvider: boolean;
  githubProvider: boolean;
  googleProvider: boolean;
  microsoftProvider: boolean;
  twitterProvider: boolean;
};

const Example: React.FC<ExampleProps> = ({
  appleProvider,
  facebookProvider,
  githubProvider,
  googleProvider,
  microsoftProvider,
  twitterProvider,
}) => {
  return (
    <FirebaseDiscussion
      firestore={firestore}
      auth={auth}
      identifier="test-discussion-2"
      appleProvider={appleProvider}
      facebookProvider={facebookProvider}
      githubProvider={githubProvider}
      googleProvider={googleProvider}
      microsoftProvider={microsoftProvider}
      twitterProvider={twitterProvider}
    />
  );
};
export default Example;
