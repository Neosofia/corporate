import { useEffect, useState } from "react";
import { useParams } from "react-router";

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug';

const GetMD = () => {
    let params = useParams();
    const [content, setContent] = useState("");

    const path = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);

    useEffect(() => {
        const loadContent = async () => {
            console.log('Loading content:', params.id);
            try {
                const response = await fetch(`${path}${params.id || '0000_why_compliance'}.md`);
                const text = await response.text();
                setContent(text);
            } catch (error) {
                console.error('Failed to load content:', error);
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
 * Why does react-router serve the raw mds? 
 * Need hooks to pre-render the build for prod or real time for dev.
 */
export const RenderMD = () => {
    let params = useParams();

    const linkComponent = ({ href = '', ...props }) => {

        if (href.startsWith('http')) {
            return <a href={href} {...props} />;
        }
        else {
            var path = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);
            return <a href={href.replace("./", path).replace(".md","")} {...props} />;
        }
    };

    return (
        <ReactMarkdown
            rehypePlugins={[rehypeSlug, rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{ a: linkComponent }}
        >
            {GetMD()}
        </ReactMarkdown >
    )
}