import React, { useState } from "react";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";
import { useAuthState } from "react-firebase-hooks/auth";

import { createComment } from "@/lib/createComment";

import LoginButtonGroup from "./login-button-group";
import MarkdownRenderer from "./markdown-renderer";
import SignOutButton from "./sign-out-button";
import { MarkdownSvg } from "./svg";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

const CommentInput: React.FC = () => {
  const { firestore, identifier, auth } = useFirebaseDiscussion();
  // User
  const [user] = useAuthState(auth);
  // User input
  const [comment, setComment] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  // Submit
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;
    if (!user || loading) return;
    setLoading(true);
    try {
      // Create comment
      const success = await createComment({
        firestore,
        identifier,
        user,
        content: comment,
      });
      if (success) setComment(""); // Clear input
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

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
                  placeholder={user ? "Write a comment" : "Sign in to comment"}
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
                    <MarkdownSvg
                      className="h-4 w-4 fill-current"
                      aria-label="hidden"
                    />
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
              <Button type="submit" disabled={loading || !comment}>
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Tabs>
    </form>
  );
};
export default CommentInput;
