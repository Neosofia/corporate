import type { Config } from "@react-router/dev/config";
import fs from 'fs';
import path from 'path';

export default {
  ssr: false,

  async prerender() {

    const blogDir = path.join(__dirname, 'blog');
    const filenames = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    const posts = filenames.map(file => ({
      href: `/blog/${file.replace('.md', '')}`
    }));


    return [
      "/",
      "/blog",
      "/qms",
      ...posts.map((post) => post.href),
    ];
  },
} satisfies Config;
