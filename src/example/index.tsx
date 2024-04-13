import React from "react"
import FirebaseDiscusion from "@/components"

import { auth, firestore } from "./firebase"

type ExampleProps = {
  theme: "light" | "dark"
  oauthApple: boolean
  oauthGoogle: boolean
  oauthGithub: boolean
  oauthTwitter: boolean
  oauthFacebook: boolean
  oauthMicrosoft: boolean
}

const Example: React.FC<ExampleProps> = ({
  theme,
  oauthApple,
  oauthFacebook,
  oauthGithub,
  oauthGoogle,
  oauthMicrosoft,
  oauthTwitter,
}) => {
  return (
    <div className={theme}>
      <FirebaseDiscusion
        firestore={firestore}
        auth={auth}
        usersCollection="users"
        identifier="test-discussion"
        oauthOptions={{
          apple: oauthApple,
          facebook: oauthFacebook,
          github: oauthGithub,
          google: oauthGoogle,
          microsoft: oauthMicrosoft,
          twitter: oauthTwitter,
        }}
      />
    </div>
  )
}
export default Example
