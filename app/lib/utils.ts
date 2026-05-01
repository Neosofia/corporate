import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractMarkdownTitle(matches: ({ data?: unknown } | undefined)[], defaultTitle: string): string {
  const md = matches.find((m) => typeof m?.data === 'string')?.data as string | undefined;
  return md ? md.match(/# (.*)/)?.[1] ?? defaultTitle : defaultTitle;
}
