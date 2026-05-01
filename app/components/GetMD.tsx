import { Link } from "react-router";

import React from 'react';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug';

import { ArrowTopRightOnSquareIcon, InformationCircleIcon, CalendarDaysIcon, UserIcon, TagIcon, LightBulbIcon, ExclamationTriangleIcon, ExclamationCircleIcon, FireIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export interface TOCItem {
    level: number;
    text: string;
    slug: string;
}

export interface PostMeta {
    author?: string;
    tags?: string[];
    published?: string;
    updated?: string;
    readTime?: string;
    nextPost?: { title: string; path: string } | null;
    prevPost?: { title: string; path: string } | null;
}

export interface LoadMDResult {
    content: string;
    meta: PostMeta;
    toc: TOCItem[];
}

export function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!match) return { data: {}, content: raw };

    const yaml = match[1];
    const data: Record<string, string | string[]> = {};
    for (const line of yaml.split('\n')) {
        const colonIdx = line.indexOf(':');
        if (colonIdx < 0) continue;
        const key = line.slice(0, colonIdx).trim();
        const value = line.slice(colonIdx + 1).trim();
        if (!key) continue;
        if (value.startsWith('[') && value.endsWith(']')) {
            data[key] = value.slice(1, -1).split(',').map(v => v.trim()).filter(Boolean);
        } else {
            data[key] = value;
        }
    }

    return { data, content: raw.slice(match[0].length) };
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function extractTOC(content: string): TOCItem[] {
    const items: TOCItem[] = [];
    const re = /^(#{1,3}) (.+)$/gm;
    const seen: Record<string, number> = {};
    let match;
    while ((match = re.exec(content)) !== null) {
        const level = match[1].length;
        const rawText = match[2]
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/`([^`]+)`/g, '$1');
        let slug = slugify(rawText);
        if (seen[slug] !== undefined) {
            seen[slug]++;
            slug = `${slug}-${seen[slug]}`;
        } else {
            seen[slug] = 0;
        }
        items.push({ level, text: rawText, slug });
    }
    return items;
}

export function estimateReadTime(content: string): string {
    const words = content.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}

export async function LoadMD(
    params: { id?: string, "*"?: string },
    request: { url: string }): Promise<LoadMDResult> {

    if (params.id && params.id.includes('.')) {
        throw new Error(`File not found: ${params.id}`);
    }

    const url = new URL(request.url);
    const id = (params.id || params["*"] || 'readme').replace(/\/$/, '');
    const pathName = url.pathname.substring(1).replace(id, '').replace(/\/$/, '');
    const markdownPath = `${pathName}/${id}.md`.replace(/\/+/g, '/').replace(/^\//, '');
    const section = url.pathname.split('/').filter(Boolean)[0] ?? '';
    const isBlogPost = section === 'blog' && id !== 'readme';

    if (typeof window === 'undefined') {
        const { readFile, readdir } = await import('node:fs/promises');
        const { execSync } = await import('node:child_process');
        const path = await import('node:path');
        const filename = path.join(process.cwd(), markdownPath);
        const raw = await readFile(filename, 'utf8');
        const { data: frontmatter, content } = parseFrontmatter(raw);
        const toc = extractTOC(content);

        const meta: PostMeta = {
            tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : undefined,
            author: typeof frontmatter.author === 'string' ? frontmatter.author : undefined,
            readTime: estimateReadTime(content),
        };

        if (isBlogPost) {
            try {
                const { published, author } = gitFirstCommit(markdownPath, process.cwd());
                if (published) meta.published = published;
                if (author && !meta.author) meta.author = author;

                const lastLog = execSync(
                    `git log --follow --format="%aI" -1 -- "${markdownPath}"`,
                    { cwd: process.cwd(), stdio: ['pipe', 'pipe', 'pipe'] }
                ).toString().trim();
                if (lastLog && lastLog !== meta.published) meta.updated = lastLog;
            } catch {
                // git not available
            }

            try {
                const blogDir = path.join(process.cwd(), 'blog');
                const files = (await readdir(blogDir))
                    .filter(f => f.endsWith('.md') && f !== 'readme.md')
                    .sort();
                const currentFile = path.basename(markdownPath);
                const idx = files.indexOf(currentFile);

                async function getPostTitle(file: string): Promise<string> {
                    const c = await readFile(path.join(blogDir, file), 'utf8');
                    const { content: pc } = parseFrontmatter(c);
                    return pc.match(/^# (.+)$/m)?.[1] ?? file.replace(/\.md$/, '').replace(/_/g, ' ');
                }

                async function isDraft(file: string): Promise<boolean> {
                    const c = await readFile(path.join(blogDir, file), 'utf8');
                    const { data } = parseFrontmatter(c);
                    return data.draft === 'true';
                }

                if (idx > 0) {
                    // find nearest non-draft prev
                    for (let i = idx - 1; i >= 0; i--) {
                        if (await isDraft(files[i])) continue;
                        meta.prevPost = {
                            title: await getPostTitle(files[i]),
                            path: `/blog/${files[i].replace(/\.md$/, '')}`,
                        };
                        break;
                    }
                }
                if (idx >= 0 && idx < files.length - 1) {
                    // find nearest non-draft next
                    for (let i = idx + 1; i < files.length; i++) {
                        if (await isDraft(files[i])) continue;
                        meta.nextPost = {
                            title: await getPostTitle(files[i]),
                            path: `/blog/${files[i].replace(/\.md$/, '')}`,
                        };
                        break;
                    }
                }
            } catch {
                // filesystem not available
            }
        }

        return { content, meta, toc };
    }

    const prefix = url.origin;
    const filename = prefix + `/${markdownPath}`;
    let res = await fetch(filename);
    if (!res.ok) {
        res = await fetch(prefix + `/app/${markdownPath}`);
        if (!res.ok) {
            throw new Error(`File not found: ${filename}`);
        }
    }
    const raw = await res.text();
    const { data: frontmatter, content } = parseFrontmatter(raw);
    const toc = extractTOC(content);

    return {
        content,
        meta: {
            tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : undefined,
            author: typeof frontmatter.author === 'string' ? frontmatter.author : undefined,
            readTime: estimateReadTime(content),
        },
        toc,
    };
}

const PostMetaBar = ({ meta }: { meta: PostMeta }) => {
    const formatDate = (iso?: string) => {
        if (!iso) return null;
        return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const published = formatDate(meta.published);
    const updated = formatDate(meta.updated);

    const hasContent = meta.author || published || (meta.tags && meta.tags.length > 0) || meta.readTime;
    if (!hasContent) return null;

    return (
        <div className="not-prose flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400 mt-2 mb-8 pb-6 border-b border-slate-700/60">
            {meta.author && (
                <span className="flex items-center gap-1.5">
                    <UserIcon className="w-4 h-4 shrink-0" />
                    {meta.author}
                </span>
            )}
            {published && (
                <span className="flex items-center gap-1.5">
                    <CalendarDaysIcon className="w-4 h-4 shrink-0" />
                    {published}
                    {updated && <span className="text-slate-500 text-xs">&nbsp;(updated {updated})</span>}
                </span>
            )}
            {meta.readTime && (
                <span className="text-slate-500">{meta.readTime}</span>
            )}
            {meta.tags && meta.tags.length > 0 && (
                <span className="flex items-center gap-1.5 flex-wrap">
                    <TagIcon className="w-4 h-4 shrink-0" />
                    {meta.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-slate-400 border-slate-600/50">
                            {tag}
                        </Badge>
                    ))}
                </span>
            )}
        </div>
    );
};

export function normalizeAssetPath(src: string): string {
    if (!src) return src;
    src = src.replace(/\.md$/g, '/');
    src = src.replace(/\/website\//g, '/');
    src = src.replace(/^\/?public\//, '/');
    src = src.replace(/\/\/+/, '/');
    if (!src.startsWith('http') && !src.startsWith('/')) src = '/' + src;
    return src;
}

export interface GitFirstCommitResult {
    published: string | null;
    author: string | null;
}

export function gitFirstCommit(filePath: string, cwd: string): GitFirstCommitResult {
    try {
        const { execSync } = require('node:child_process') as typeof import('node:child_process');
        const firstLog = execSync(
            `git log --follow --diff-filter=A --format="%aI|%aN" -- "${filePath}"`,
            { cwd, stdio: ['pipe', 'pipe', 'pipe'] }
        ).toString().trim().split('\n').pop() ?? '';
        const [published, author] = firstLog.split('|');
        return {
            published: published || null,
            author: author ? author.trim() : null,
        };
    } catch {
        return { published: null, author: null };
    }
}

type AlertType = 'note' | 'tip' | 'important' | 'warning' | 'caution';
const alertConfig: Record<AlertType, { icon: React.ElementType; border: string; bg: string; title: string; titleColor: string }> = {
    note:      { icon: InformationCircleIcon,   border: 'border-sky-500/60',    bg: 'bg-sky-950/30',     title: 'Note',      titleColor: 'text-sky-300' },
    tip:       { icon: LightBulbIcon,           border: 'border-green-500/60',  bg: 'bg-green-950/30',   title: 'Tip',       titleColor: 'text-green-300' },
    important: { icon: ExclamationCircleIcon,   border: 'border-purple-500/60', bg: 'bg-purple-950/30',  title: 'Important', titleColor: 'text-purple-300' },
    warning:   { icon: ExclamationTriangleIcon, border: 'border-amber-500/60',  bg: 'bg-amber-950/30',   title: 'Warning',   titleColor: 'text-amber-300' },
    caution:   { icon: FireIcon,                border: 'border-red-500/60',    bg: 'bg-red-950/30',     title: 'Caution',   titleColor: 'text-red-300' },
};

export const RenderMD = (props: { content: string; meta?: PostMeta }) => {
    const linkComponent = ({ href = '', children, className, ...props }: { href?: string; children?: React.ReactNode; className?: string }) => {
        const combinedClassName = ['inline-flex items-center gap-1', className].filter(Boolean).join(' ');

        if (href.startsWith('http')) {
            return (
                <a href={href} target="_blank" rel="noreferrer" className={combinedClassName} {...props}>
                    {children}
                    <ArrowTopRightOnSquareIcon className="h-3 w-3 shrink-0 opacity-70" aria-hidden="true" />
                </a>
            );
        }

        if (href.startsWith('#')) {
            return <a href={href} className={className} {...props}>{children}</a>;
        }

        const normalizedHref = normalizeAssetPath(href.replace(/\.md$/, '/'));

        // TBD: Figure out why we need to reload the document when navigating between dynamic routes
        return (
            <Link to={normalizedHref} reloadDocument className={combinedClassName} {...props}>
                {children}
            </Link>
        );
    };

    const imgComponent = ({ src = '', ...props }) => {
        return <img src={normalizeAssetPath(src)} {...props} />
    };

    const blockquoteComponent = ({ children, ...rest }: { children?: React.ReactNode; [key: string]: unknown }) => {
        const kids = React.Children.toArray(children).filter(k => !(typeof k === 'string' && k.trim() === ''));
        let type: AlertType | undefined;
        let contentKids: React.ReactNode[] = kids;

        const firstP = kids[0];
        if (React.isValidElement(firstP)) {
            const pKids = React.Children.toArray((firstP.props as { children?: React.ReactNode }).children);
            const firstText = pKids[0];
            if (typeof firstText === 'string') {
                const m = firstText.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
                if (m) {
                    type = m[1].toLowerCase() as AlertType;
                    const rest2 = firstText.slice(m[0].length).trimStart();
                    const remainingPKids = rest2 ? [rest2, ...pKids.slice(1)] : pKids.slice(1);
                    const remainingP = remainingPKids.length > 0
                        ? React.cloneElement(firstP as React.ReactElement<{ children: React.ReactNode }>, {}, ...remainingPKids)
                        : null;
                    contentKids = [remainingP, ...kids.slice(1)].filter(Boolean);
                }
            }
        }

        const config = type ? alertConfig[type] : undefined;
        if (!config) {
            return <blockquote className="border-l-4 border-slate-600 pl-4 text-slate-400 italic my-4" {...rest}>{children}</blockquote>;
        }

        const Icon = config.icon;
        return (
            <div className={cn('rounded-lg border-l-4 px-4 py-3 my-6', config.border, config.bg)}>
                <div className={cn('flex items-center gap-2 mb-2 font-semibold text-sm', config.titleColor)}>
                    <Icon className="w-4 h-4 shrink-0" />
                    {config.title}
                </div>
                <div className="text-slate-300 text-sm [&>p]:mb-2 [&>p:last-child]:mb-0">
                    {contentKids}
                </div>
            </div>
        );
    };

    const h1Component = ({ children, ...rest }: { children?: React.ReactNode; [key: string]: unknown }) => (
        <>
            <h1 {...rest}>{children}</h1>
            {props.meta && <PostMetaBar meta={props.meta} />}
        </>
    );

    return (
        <ReactMarkdown
            rehypePlugins={[rehypeSlug, rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{ a: linkComponent, blockquote: blockquoteComponent as any, img: imgComponent, h1: h1Component as any }}
        >
            {props.content}
        </ReactMarkdown >
    )
}