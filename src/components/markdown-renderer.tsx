import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { atomDark } from "./atom-dark";
import { CopySvg, SuccessSvg } from "./svg";
import { Button } from "./ui/button";

interface CopyButtonProps extends React.HTMLAttributes<HTMLPreElement> {}

const CopyButton: React.FC<CopyButtonProps> = ({ children }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleClick = () => {
    if (React.isValidElement(children)) {
      navigator.clipboard.writeText(children.props.children);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Button
      variant="default"
      size="icon"
      className="absolute right-0 top-0 m-2"
      onClick={handleClick}
    >
      {copied ? (
        <SuccessSvg className="h-4 w-4 fill-current" aria-label="hidden" />
      ) : (
        <CopySvg className="h-4 w-4 fill-current" aria-label="hidden" />
      )}
    </Button>
  );
};

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      className="prose dark:prose-invert lg:prose-lg"
      rehypePlugins={[rehypeRaw, rehypeExternalLinks, rehypeSanitize]}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ ref, children, className, node, style, ...rest }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              children={String(children).replace(/\n$/, "")}
              style={atomDark}
              PreTag="div"
              language={match[1]}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
        pre({ children, style }) {
          return (
            <div className="relative" style={style}>
              <CopyButton>{children}</CopyButton>
              <pre>{children}</pre>
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
export default MarkdownRenderer;
