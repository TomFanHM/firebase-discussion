import React from "react"
import FirebaseDiscusion from "@/components"

import { auth, firestore } from "./firebase"

type ExampleProps = {
  theme: "light" | "dark"
}

const Example: React.FC<ExampleProps> = ({ theme }) => {
  return (
    <div className={theme}>
      <FirebaseDiscusion
        firestore={firestore}
        auth={auth}
        usersCollection="users"
        identifier="test-discussion"
        oauthOptions={{
          apple: false,
          google: true,
          github: false,
          twitter: false,
          facebook: false,
          microsoft: false,
        }}
      />
    </div>
  )
}
export default Example
