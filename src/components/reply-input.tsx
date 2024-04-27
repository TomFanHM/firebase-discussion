import React, { useEffect, useRef, useState } from "react";
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context";
import { useAuthState } from "react-firebase-hooks/auth";

import MarkdownRenderer from "./markdown-renderer";
import { MarkdownSvg } from "./svg";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

type ReplyInputProps = {
  identifier: { discussion: string; comment: string };
};

const ReplyInput: React.FC<ReplyInputProps> = ({ identifier }) => {
  const { firestore, auth } = useFirebaseDiscussion();
  // User focus
  const [focus, setFocus] = useState<boolean>(false);
  useEffect(() => {
    if (focus && textareaRef.current) textareaRef.current.focus();
  }, [focus]);
  // User
  const [user] = useAuthState(auth);
  // Reply input
  const [reply, setReply] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };
  // Ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reply) return;
    if (!user || loading) return;
    setLoading(true);
    try {
      //
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    } finally {
      setLoading(false);
      setFocus(false);
    }
  };

  if (!user) return null;

  if (!focus)
    return (
      <div className="w-full border-t px-6 py-2">
        <Input
          placeholder="Write a reply"
          readOnly
          onClick={() => setFocus(true)}
        />
      </div>
    );

  return (
    <form className="w-full border-t" onSubmit={handleSubmit}>
      <Tabs defaultValue="write" className="w-full">
        <Card className="border-none shadow-none">
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
                  ref={textareaRef}
                  placeholder="Write a reply"
                  disabled={!user}
                  className="max-h-[500px] min-h-[100px] focus-visible:ring-0"
                  value={reply}
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
                <MarkdownRenderer content={reply} />
              </div>
            </TabsContent>
          </CardContent>
          <CardFooter>
            <div className="flex flex-1 items-center justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setFocus(false);
                  setReply("");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!reply || loading}>
                Reply
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Tabs>
    </form>
  );
};
export default ReplyInput;
