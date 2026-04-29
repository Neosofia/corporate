import { Link } from "react-router";

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug';

import { InformationCircleIcon } from '@heroicons/react/24/outline'

export async function LoadMD(
    params: { id?: string, "*"?: string },
    request: { url: string }) {

    // if we're looking for a file extension, it's probably the breadcrumbs looking for a pdf
    // or some type of recursion we need to break out of
    if (params.id && params.id.includes('.')) {
        throw new Error(`File not found: ${params.id}`);
    }

    console.log("REQUEST URL:", request.url)
    const url = new URL(request.url);
    // Strip the trailing slash from a splat route so we don't get into a recursion
    // Default to the readme file if the route is a predefined index route
    const id = (params.id || params["*"] || 'readme').replace(/\/$/, '');
    const pathName = url.pathname.substring(1).replace(id, '').replace(/\/$/, '');
    const markdownPath = `${pathName}/${id}.md`.replace(/\/+/g, '/').replace(/^\//, '');

    if (typeof window === 'undefined') {
        const { readFile } = await import('node:fs/promises');
        const path = await import('node:path');
        const filename = path.join(process.cwd(), markdownPath);

        return await readFile(filename, 'utf8');
    }

    const prefix = url.origin;
    const filename = prefix + `/${markdownPath}`;

    console.log("LOADING", filename, "based on this path:", pathName, ", and this id:", id)

    const res = await fetch(filename);
    const content = await res.text();

    return content;
}

export const RenderMD = (props: any) => {
    const linkComponent = ({ href = '', ...props }) => {
        if (href.startsWith('http')) {
            return <Link to={href} target="_blank" rel="noreferrer" {...props} />;
        }

        if (href.startsWith('#')) {
            return <a href={href} {...props} />;
        }

        const normalizedHref = normalizeAssetPath(href.replace(/\.md$/, '/'));

        // TBD: Figure out why we need to reload the document when navigating between dynamic routes
        return <Link to={normalizedHref} reloadDocument {...props} />;
    };

    const normalizeAssetPath = (src: string) => {
        if (!src) {
            return src;
        }

        src = src.replace(/\.md$/g, '/');
        src = src.replace(/\/website\//g, '/');
        src = src.replace(/^\/?public\//, '/');
        src = src.replace(/\/\/+/, '/');

        if (!src.startsWith('http') && !src.startsWith('/')) {
            src = '/' + src;
        }

        return src;
    };

    const imgComponent = ({ src = '', ...props }) => {
        return <img src={normalizeAssetPath(src)} {...props} />
    };

    const quoteComponent = ({ children, ...props }: { children?: any }) => {
        if (typeof children === 'string' && children.includes('[!')) {
            let style;
            switch (true) {
                case children.includes('[!CAUTION]'):
                    style = "text-red-700";
                    break;
                default:
                    style = "text-slate-100";
            }

            children = children.replace(/\[![^\]]+\]/g, '');

            return (
                <div className="">
                    <InformationCircleIcon className={'w-5 h-5 m-1 ml-0 float-left align-top ' + style} />
                    <p className="" {...props}>{children}</p>
                </div>
            );
        }

        return (
            <p {...props}>{children}</p>
        );
    };

    return (
        <ReactMarkdown
            rehypePlugins={[rehypeSlug, rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{ a: linkComponent, p: quoteComponent, img: imgComponent }}
        >
            {props.content}
        </ReactMarkdown >
    )
}