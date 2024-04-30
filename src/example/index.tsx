import React from "react";
import FirebaseDiscussion from "@/components";

import { auth, firestore } from "./firebase";
import { ThemeProvider } from "./theme-provider";

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
  theme,
  appleProvider,
  facebookProvider,
  githubProvider,
  googleProvider,
  microsoftProvider,
  twitterProvider,
}) => {
  return (
    <ThemeProvider defaultTheme={theme}>
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
    </ThemeProvider>
  );
};
export default Example;
