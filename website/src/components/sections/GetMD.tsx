import { Link } from "react-router";

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug';

import { InformationCircleIcon } from '@heroicons/react/24/outline'

export const RenderMD = (props) => {
    const linkComponent = ({ href = '', ...props }) => {
        if (href.startsWith('http')) {
            return <Link to={href} target="_blank" rel="noreferrer" {...props} />;
        }
        else {
            var path = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);
            href = href.replace(".md", "").replace("/website/", "/");

            var target = href.includes('glossary') ? 'ns-ref' : '';
            return <Link to={href} target={target} {...props} />;
        }
    };

    const imgComponent = ({ src = '', ...props }) => {
        return <img src={src.replace("/website/", "/").replace("/public/", "/")} {...props} />
    };

    const quoteComponent = ({ children, ...props }) => {
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