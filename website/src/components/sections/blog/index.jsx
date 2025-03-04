import React from "react";

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug';

import { Navbar } from "../../Navbar";


import { useParams } from "react-router";
import { useEffect, useState } from "react";

const GetPost = () => {
  let params = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      console.log('Loading blog content:', params.id);
      try {
        const response = await fetch(`/blog/${params.id || '0000_why_compliance'}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Failed to load blog content:', error);
        setContent('# Error\nFailed to load blog content.');
      }
    };
    loadContent();
  }, [params.id]);

  return content;
}

  /* What a PITA this was to get working! 
   *
   * Need to prepend the /blog/ path to all anchors so footnotes work with linkComonpent
   * Need to strip the .md extension from the href so raw content is not served 
   * Need rehype raw to remove html comments in md files
   * Need rehype slug to generate ids for headings (needed for glossary and policies)
   * Need remark gfm to support github flavored markdown
   * 
   * TBD: Better react-thonic way to do this??? 
   *    * Why does react-router serve the raw mds? 
   *    * How can I configure the converters to prepend /blog/ to all hrefs?
   */
export const Blog = () => {
  let params = useParams();

  const linkComponent = ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return <a href={href} {...props} />;
    } else {
      const link = href.substring(0, href.lastIndexOf('.')) || href;
      return <a href={link.replace("./","/blog/").replace("#",`/blog/${params.id}#`)} {...props} />;
    }
  };
  
  return (
    <div className={`bg-slate-900 text-gray-100`}>
      <Navbar />

      <section id="blog" className="min-h-screen flex flex-col py-10 justify-center items-center">
          <div className=" max-w-4xl z-10 m-8 md:m-16 prose-sm md:prose-md">
            <ReactMarkdown 
              rehypePlugins={[rehypeSlug,rehypeRaw]} 
              remarkPlugins={[remarkGfm]}
              components={{a: linkComponent}}
              >
              {GetPost()}
            </ReactMarkdown>
          </div>
      </section>
    </div>
  );
}

export default Blog;
