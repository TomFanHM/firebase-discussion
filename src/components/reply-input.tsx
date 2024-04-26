import React, { useState } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"
import { useAuthState } from "react-firebase-hooks/auth"

type ReplyInputProps = {}

const ReplyInput: React.FC<ReplyInputProps> = () => {
  const { firestore, identifier, auth } = useFirebaseDiscussion()
  // User
  const [user] = useAuthState(auth)
  // User input
  const [reply, setReply] = useState<string>("")
  //
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value)
  }
  return <div></div>
}
export default ReplyInput
