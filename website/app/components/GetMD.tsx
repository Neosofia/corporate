import { Link } from "react-router";

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug';

import { InformationCircleIcon } from '@heroicons/react/24/outline'

export async function ClientLoadMD(params: { id?: string, "*"?: string }, request: { url: string} ) {
    const url = new URL(request.url);
    const path = url.pathname.substring(0, url.pathname.lastIndexOf('/'));

    console.log("CLIENT", path)

    let filename = `${path}/${params.id || params["*"] || 'readme'}.md`

    const res = await fetch(filename);
    const content = await res.text();

    return content;
}

export async function ServerLoadMD(params: { id?: string, "*"?: string }, request: { url: string} ) {
    const url = new URL(request.url);
    // If we don't have a param id, build an index route based on the full pathname
    if (!params.id) {
        var path = url.pathname
    } else {
        var path = url.pathname.substring(1, url.pathname.lastIndexOf('/')).replace(params.id || '', '');
    }
    console.log("SERVER path", path)

    /* TBD: This will work for production builds (main), but will need to be redone for staging/preview builds.
     * I'm done trying to fight the ssr/ssg, client/server, dev/prod magic incantation to make every environment
     * work in every permutation and combination of the above. Filesystem reads are not possible even when
     * doing ssg in a "server"
     */
    let filename = `https://raw.githubusercontent.com/Neosofia/corporate/refs/heads/main/website/${path}/${params.id || 'readme'}.md`

    console.log("SERVER filename", filename)

    const res = await fetch(filename);
    const content = await res.text();

    return content;
}

export const RenderMD = (props: any) => {
    const linkComponent = ({ href = '', ...props }) => {
        if (href.startsWith('http')) {
            return <Link to={href} target="_blank" rel="noreferrer" {...props} />;
        }
        else {
            href = href.replace(".md", "/").replace("/website/", "/");
            var target = href.includes('glossary') ? 'ns-ref' : '';
            return <Link to={href} reloadDocument target={target} {...props} />;
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