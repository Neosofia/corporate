import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MARKDOWN_KEYS = new Set(
  Object.keys(import.meta.glob(['../../resources/**/*.md', '../../qms/**/*.md', '../../blog/**/*.md'], { eager: true }))
    .map((file) => file.replace(/^.*\/(resources|qms|blog)\/(.+)\.md$/, '$1/$2'))
);

/** Breadcrumb href: nearest ancestor with a markdown page (readme or flat .md). */
export function markdownCrumbHref(segments: string[], index: number): string {
  for (let j = index; j >= 0; j--) {
    const key = segments.slice(0, j + 1).join('/');
    if (j === 0) return `/${key}`;
    if (MARKDOWN_KEYS.has(key)) return `/${key}`;
    if (MARKDOWN_KEYS.has(`${key}/readme`)) return `/${key}/readme`;
  }
  return `/${segments.slice(0, index + 1).join('/')}`;
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
