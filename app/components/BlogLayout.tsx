import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { cn } from '@/lib/utils';
import type { TOCItem, PostMeta } from './GetMD';

interface BlogLayoutProps {
    children: React.ReactNode;
    toc: TOCItem[];
    meta: PostMeta;
}

function TOCSidebar({ toc }: { toc: TOCItem[] }) {
    const [activeSlug, setActiveSlug] = useState<string>('');

    useEffect(() => {
        const headings = document.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id]');
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSlug(entry.target.id);
                    }
                }
            },
            { rootMargin: '-8% 0px -80% 0px', threshold: 0 }
        );

        headings.forEach(h => observer.observe(h));
        return () => observer.disconnect();
    }, []);

    return (
        <aside className="hidden xl:flex flex-col w-56 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 px-1">
                    On this page
                </p>
                <ul className="space-y-0.5">
                    {toc.map(item => (
                        <li
                            key={`${item.slug}-${item.level}`}
                            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
                        >
                            <a
                                href={`#${item.slug}`}
                                className={cn(
                                    'block text-sm py-1 px-1 rounded transition-colors leading-snug',
                                    activeSlug === item.slug
                                        ? 'text-sky-400 font-medium'
                                        : 'text-slate-400 hover:text-slate-200'
                                )}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export function BlogLayout({ children, toc, meta }: BlogLayoutProps) {
    const showTOC = toc.length > 2;

    return (
        <div className="flex gap-12 items-start">
            <div className="flex-1 min-w-0">
                {children}

                {(meta.prevPost || meta.nextPost) && (
                    <nav className="mt-12 flex items-stretch justify-between gap-4">
                        {meta.prevPost ? (
                            <Link
                                to={meta.prevPost.path}
                                reloadDocument
                                className="group flex flex-col gap-1 max-w-[45%] p-3 rounded-lg border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/40 transition"
                            >
                                <span className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-slate-400 transition">
                                    <ChevronLeftIcon className="w-3 h-3" />
                                    Previous
                                </span>
                                <span className="text-sm text-slate-300 group-hover:text-white transition line-clamp-2">
                                    {meta.prevPost.title}
                                </span>
                            </Link>
                        ) : <div />}

                        {meta.nextPost ? (
                            <Link
                                to={meta.nextPost.path}
                                reloadDocument
                                className="group flex flex-col gap-1 items-end max-w-[45%] p-3 rounded-lg border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/40 transition text-right"
                            >
                                <span className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-slate-400 transition">
                                    Next
                                    <ChevronRightIcon className="w-3 h-3" />
                                </span>
                                <span className="text-sm text-slate-300 group-hover:text-white transition line-clamp-2">
                                    {meta.nextPost.title}
                                </span>
                            </Link>
                        ) : <div />}
                    </nav>
                )}
            </div>

            {showTOC && <TOCSidebar toc={toc} />}
        </div>
    );
}
