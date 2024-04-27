import { Timestamp } from "@/types";

export function timestampToRelativeTime(timestamp: Timestamp): string {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const now = new Date();

  // Calculate the difference in milliseconds
  const diff = now.getTime() - date.getTime();

  // Convert this difference into days, hours, minutes, etc.
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / (86400000 * 7));
  const months = Math.floor(diff / (86400000 * 30));
  const years = Math.floor(diff / (86400000 * 365));

  // Format the output
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `Now`;
}
