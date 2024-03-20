import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import rehypeExternalLinks from "rehype-external-links"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"

import { atomDark } from "./atom-dark"
import { Button } from "./ui/button"

const CopySvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
      {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
      <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" />
    </svg>
  )
}

const SuccessSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
      {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  )
}

interface CopyButtonProps extends React.HTMLAttributes<HTMLPreElement> {}

const CopyButton: React.FC<CopyButtonProps> = ({ children }) => {
  const [copied, setCopied] = useState<boolean>(false)
  const handleClick = () => {
    if (React.isValidElement(children)) {
      navigator.clipboard.writeText(children.props.children)
    }
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
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
  )
}

type MarkdownRendererProps = {
  content: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      className="prose dark:prose-invert lg:prose-lg"
      rehypePlugins={[rehypeRaw, rehypeExternalLinks, rehypeSanitize]}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ ref, children, className, node, style, ...rest }) {
          const match = /language-(\w+)/.exec(className || "")
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
          )
        },
        pre({ children, style }) {
          return (
            <div className="relative" style={style}>
              <CopyButton>{children}</CopyButton>
              <pre>{children}</pre>
            </div>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
export default MarkdownRenderer
