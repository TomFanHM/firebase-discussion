import React from "react"
import FirebaseDiscusion from "@/components"

import { auth, firestore } from "./firebase"

const Example: React.FC = () => {
  return (
    <FirebaseDiscusion
      firestore={firestore}
      auth={auth}
      usersCollection="users"
      identifier="test-discussion"
    />
  )
}
export default Example
