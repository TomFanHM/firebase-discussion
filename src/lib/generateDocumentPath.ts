import { config } from "@/config";
import { Action } from "@/types";

export function generateDocumentPath(action: Action): string {
  if (action.category === "discussion")
    return `${config.collection}/${action.identifier.discussion}`;
  if (action.category === "comment")
    return `${config.collection}/${action.identifier.discussion}/comments/${action.identifier.comment}`;
  return `${config.collection}/${action.identifier.discussion}/comments/${action.identifier.comment}/replies/${action.identifier.reply}`;
}
