import React from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"

import LoginButtonGroup from "./login-button-group"
import SignOutButton from "./sign-out-button"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

const CommentInput: React.FC = () => {
  const { firestore, auth, identifier, user } = useFirebaseDiscussion()
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="justify-between">
        {user ? <SignOutButton /> : <LoginButtonGroup />}
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  )
}
export default CommentInput
