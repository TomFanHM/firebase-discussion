import React, { useState, useTransition } from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"

import { createComment } from "@/lib/createComment"

import LoginButtonGroup from "./login-button-group"
import MarkdownRenderer from "./markdown-renderer"
import SignOutButton from "./sign-out-button"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Textarea } from "./ui/textarea"

const CommentInput: React.FC = () => {
  const { firestore, identifier, user } = useFirebaseDiscussion()
  // User input
  const [comment, setComment] = useState<string>("")
  const [_, startTransition] = useTransition()
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    startTransition(() => {
      setComment(e.target.value)
    })
  }
  // Placeholder
  const placeholder = user ? "Write a comment" : "Sign in to comment"
  // Submit
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || loading) return
    setLoading(true)
    try {
      // Create comment
      const success = await createComment({
        firestore,
        identifier,
        user,
        content: comment,
      })
      if (success) setComment("") // Clear input
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Tabs defaultValue="write" className="w-full">
        <Card>
          {/* Header */}
          <CardHeader className="pb-0">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </CardHeader>
          {/* Content */}
          <CardContent className="py-2">
            <TabsContent value="write">
              <div className="rounded-md focus-within:ring-1 focus-within:ring-ring">
                <Textarea
                  placeholder={placeholder}
                  disabled={!user}
                  className="max-h-[500px] min-h-[100px] focus-visible:ring-0"
                  value={comment}
                  onChange={handleInputChange}
                />
                <div className="flex justify-end rounded-b-md border border-t-0 px-2.5 py-2 align-middle">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://guides.github.com/features/mastering-markdown/"
                  >
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="h-4 w-4 fill-current"
                    >
                      {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                      <path d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z" />
                    </svg>
                  </a>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preview">
              <div className="min-h-[100px] border-b-2 px-2 py-4">
                <MarkdownRenderer content={comment} />
              </div>
            </TabsContent>
          </CardContent>
          <CardFooter>
            <div className="flex flex-1 items-center justify-between">
              {user ? <SignOutButton /> : <LoginButtonGroup />}
              <Button type="submit" disabled={loading}>
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Tabs>
    </form>
  )
}
export default CommentInput
