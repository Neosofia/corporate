import type { Config } from "@react-router/dev/config";
import fs from 'fs';
import path from 'path';

function getMarkdownFiles(dir: string): string[] {
  const files = fs.readdirSync(path.join(__dirname,dir));
  return files
    .filter(file => path.extname(file) === '.md')
    .map(file => `/${dir}/` + path.basename(file, '.md'));
}

const qmsFiles = getMarkdownFiles( 'qms' );
const blogFiles = getMarkdownFiles( 'blog' );
const sopFiles = getMarkdownFiles( 'qms/procedures' );
const resourceFiles = getMarkdownFiles( 'resources' );

export default {
  ssr: false,

  async prerender() {
    return [
      "/",
      "/blog",
      "/qms",
      "/qms/procedures",
      ...qmsFiles,
      ...blogFiles,
      ...sopFiles,
      ...resourceFiles,
    ];
  },
} satisfies Config;
