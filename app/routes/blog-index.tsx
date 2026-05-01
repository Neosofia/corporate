import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { MagnifyingGlassIcon, TagIcon, CalendarDaysIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { parseFrontmatter, estimateReadTime, normalizeAssetPath, gitFirstCommit } from '@/components/GetMD';
import type { Route } from "../+types/root";

export interface PostSummary {
    path: string;
    title: string;
    description: string;
    image: string | null;
    tags: string[];
    author: string | null;
    published: string | null;
    readTime: string;
}

export async function loader(_: Route.LoaderArgs): Promise<PostSummary[]> {
    const { readFile, readdir } = await import('node:fs/promises');
    const path = await import('node:path');

    const blogDir = path.join(process.cwd(), 'blog');
    const files = (await readdir(blogDir))
        .filter(f => f.endsWith('.md') && f !== 'readme.md')
        .sort();

    const posts: PostSummary[] = [];

    for (const file of files) {
        const raw = await readFile(path.join(blogDir, file), 'utf8');

        const { data: fm, content } = parseFrontmatter(raw);
        if (fm.draft === 'true') continue;

        const tags = Array.isArray(fm.tags) ? fm.tags : [];

        // Strip reference-style link definitions [foo]: ...
        const cleanContent = content.replace(/^\[[^\]]+\]:\s+\S+.*$/gm, '').trim();

        const title = cleanContent.match(/^# (.+)$/m)?.[1]
            ?? file.replace(/\.md$/, '').replace(/_/g, ' ');

        // First image
        const imgMatch = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
        const image = imgMatch ? normalizeAssetPath(imgMatch[1]) : null;

        // First real paragraph after the title
        let description = '';
        let pastTitle = false;
        for (const line of cleanContent.split('\n')) {
            if (!pastTitle) { if (line.startsWith('# ')) pastTitle = true; continue; }
            const stripped = line
                .replace(/^#{1,6}\s+/, '')
                .replace(/\*\*([^*]+)\*\*/g, '$1')
                .replace(/\*([^*]+)\*/g, '$1')
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .trim();
            if (stripped.length > 40) {
                description = stripped.length > 180 ? stripped.slice(0, 177) + '…' : stripped;
                break;
            }
        }

        const { published, author } = gitFirstCommit(`blog/${file}`, process.cwd());

        posts.push({
            path: `/blog/${file.replace(/\.md$/, '')}`,
            title,
            description,
            image,
            tags,
            author: typeof fm.author === 'string' ? fm.author : author,
            published,
            readTime: estimateReadTime(content),
        });
    }

    return posts;
}

export function meta() {
    return [
        { title: 'Neosofia | Blog' },
        { name: 'description', content: 'Compliance, architecture, and QMS insights from the Neosofia team.' },
    ];
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const tagPillClass = 'shrink-0 px-3 py-1 rounded-full text-xs border transition';

function PostCard({ post }: { post: PostSummary }) {
    return (
        <Link to={post.path} reloadDocument className="group">
            <Card className="h-full hover:ring-slate-600 hover:bg-slate-800/70 transition">
                {post.image && (
                    <img
                        src={post.image}
                        alt=""
                        className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition"
                    />
                )}
                <CardHeader>
                    <CardTitle className="text-base leading-snug group-hover:text-white transition">
                        {post.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        {post.author && (
                            <span className="flex items-center gap-1">
                                <UserIcon className="w-3 h-3 shrink-0" />{post.author}
                            </span>
                        )}
                        {post.published && (
                            <span className="flex items-center gap-1">
                                <CalendarDaysIcon className="w-3 h-3 shrink-0" />{formatDate(post.published)}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3 shrink-0" />{post.readTime}
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 gap-3">
                    {post.description && (
                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                            {post.description}
                        </p>
                    )}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                            {post.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-slate-400 border-slate-600/50">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
    const posts = (loaderData ?? []) as PostSummary[];
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const allTags = useMemo(() => {
        const set = new Set<string>();
        posts.forEach(p => p.tags.forEach(t => set.add(t)));
        return Array.from(set).sort();
    }, [posts]);

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        return posts.filter(p => {
            const matchTag = !activeTag || p.tags.includes(activeTag);
            const matchQuery = !q
                || p.title.toLowerCase().includes(q)
                || p.description.toLowerCase().includes(q)
                || p.tags.some(t => t.toLowerCase().includes(q));
            return matchTag && matchQuery;
        });
    }, [posts, query, activeTag]);

    return (
        <section id="blog">
            <h2 className="text-xl font-semibold text-slate-400 mb-6">Compliance, architecture, and QMS insights.</h2>

            {/* Search + tag filters */}
            <div className="flex flex-col gap-3 mb-8">
                <div className="relative w-full">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                    <Input
                        type="search"
                        placeholder="Search compliance, architecture, QMS…"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>

                {allTags.length > 0 && (
                    <div className="flex w-full items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
                        <TagIcon className="w-4 h-4 text-slate-500 shrink-0" />
                        <button
                            onClick={() => setActiveTag(null)}
                            className={cn(
                                tagPillClass,
                                activeTag === null
                                    ? 'bg-sky-600/30 border-sky-500/60 text-sky-300'
                                    : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                            )}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                                className={cn(
                                    tagPillClass,
                                    activeTag === tag
                                        ? 'bg-sky-600/30 border-sky-500/60 text-sky-300'
                                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                                )}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Card grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map(post => <PostCard key={post.path} post={post} />)}
                </div>
            ) : (
                <p className="text-slate-500 text-sm">No posts match your search.</p>
            )}
        </section>
    );
}
