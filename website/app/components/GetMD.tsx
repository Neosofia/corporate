import { Link } from "react-router";

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug';

import { InformationCircleIcon } from '@heroicons/react/24/outline'

export async function LoadMD(
    params: { id?: string, "*"?: string },
    request: { url: string },
    prefix: string = '') {

    const url = new URL(request.url);
    // If we don't have a param id, build an index route based on the full pathname
    if (!params.id) {
        var path = url.pathname
    } else {
        var path = url.pathname.substring(1, url.pathname.lastIndexOf('/')).replace(params.id || '', '');
    }

    let filename = prefix + `/${path}/${params.id || params["*"] || 'readme'}.md`.replace(/(?<!https:)\/+/g, '/')
    console.log("LOADING", filename)

    const res = await fetch(filename);
    const content = await res.text();

    return content;
}

export async function ServerLoadMD(params: { id?: string, "*"?: string }, request: { url: string }) {
    LoadMD( params, request, `https://raw.githubusercontent.com/Neosofia/corporate/refs/heads/main/website` );
}

export const RenderMD = (props: any) => {
    const linkComponent = ({ href = '', ...props }) => {
        if (href.startsWith('http')) {
            return <Link to={href} target="_blank" rel="noreferrer" {...props} />;
        }
        else {
            href = href.replace(".md", "").replace("/website/", "/");

            return <Link to={href} prefetch="viewport" {...props} />;
        }
    };

    const imgComponent = ({ src = '', ...props }) => {
        return <img src={src.replace("/website/", "/").replace("/public/", "/")} {...props} />
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