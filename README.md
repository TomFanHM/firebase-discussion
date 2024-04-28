# Firebase Discussion

Firebase Discussion is a React TypeScript library that enables rapid development of discussion components within your application. Inspired by the functionality of Giscus, it leverages Firebase for real-time features, allowing website users to vote with emojis, leave comments in Markdown format, and reply to comments, mirroring the capabilities of Giscus.

## Features

- Real-time discussion threads
- Emoji voting on comments
- Markdown support for comments

## Installation

This library is currently available through npm. Yarn support may be added in the future.

```bash
npm install firebase-discussion
```

## Usage

Here is a basic example of how to use Firebase Discussion in your project:

```tsx
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
      identifier="test-discussion"
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
```

Ensure you have configured Firebase in your project as `FirebaseDiscussion` relies on `firestore` and `auth` objects from Firebase.

## Configuration

Below are the `FirebaseDiscussion` component properties for configuration:

- `firestore`: Firebase Firestore instance.
- `auth`: Firebase Auth instance.
- `usersCollection`: The name of the Firestore collection where user data is stored.
- `identifier`: A unique identifier for the discussion.
- `providers`: Configuration for OAuth providers, with boolean values to enable/disable each.

## Contributing

Contributions are welcome! Please refer to the repository's issues/PRs sections to start contributing or to discuss new features or bugs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
