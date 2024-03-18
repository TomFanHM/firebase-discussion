import DOMPurify from "dompurify"
import { marked } from "marked"

export async function safeMarkdownToHtml(markdown: string): Promise<string> {
  try {
    const parsedMarkdown = await marked.parse(markdown)
    return DOMPurify.sanitize(parsedMarkdown)
  } catch (error) {
    console.log("🚀 ~ safeMarkdownToHtml ~ error:", error)
  }
  return "Error!"
}
