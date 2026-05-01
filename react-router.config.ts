import type { Config } from "@react-router/dev/config";
import fs from 'fs';
import path from 'path';

function walkMarkdownDir(dir: string): string[] {
  const abs = path.join(__dirname, dir);
  if (!fs.existsSync(abs)) return [];

  const entries = fs.readdirSync(abs, { withFileTypes: true });
  const routes: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes.push(...walkMarkdownDir(`${dir}/${entry.name}`));
    } else if (entry.isFile() && path.extname(entry.name) === '.md') {
      const slug = path.basename(entry.name, '.md');
      const relDir = dir.replace(/^\//, '');
      routes.push(`/${relDir}/${slug}`);
    }
  }

  return routes;
}

export default {
  ssr: false,

  async prerender() {
    return [
      "/",
      "/tools",
      "/blog",
      "/qms",
      "/resources",
      ...walkMarkdownDir('blog'),
      ...walkMarkdownDir('qms'),
      ...walkMarkdownDir('resources'),
    ];
  },
} satisfies Config;
