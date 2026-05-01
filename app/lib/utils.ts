import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractMarkdownTitle(matches: ({ data?: unknown } | undefined)[], defaultTitle: string): string {
  const match = matches.find((m) => {
    if (!m?.data) return false;
    if (typeof m.data === 'string') return true;
    return typeof (m.data as { content?: unknown }).content === 'string';
  });
  if (!match?.data) return defaultTitle;
  const md = typeof match.data === 'string'
    ? match.data
    : (match.data as { content: string }).content;
  return md.match(/^# (.*)/m)?.[1] ?? defaultTitle;
}
