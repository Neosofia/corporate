import { useLocation } from 'react-router';
import { RenderMD, LoadMD, type LoadMDResult } from "../components/GetMD";
import { BlogLayout } from "../components/BlogLayout";
import { extractMarkdownTitle } from "@/lib/utils";
import type { Route } from "../+types/root";

export async function loader({ params, request }: Route.LoaderArgs) {
  return LoadMD(params, request);
}

export function meta({ matches, location }: Route.MetaArgs) {
  const section = location.pathname.split('/').filter(Boolean)[0] ?? '';
  const sectionLabel = section.toUpperCase() === 'QMS' || section === 'qms'
    ? 'QMS'
    : section.charAt(0).toUpperCase() + section.slice(1);
  const title = extractMarkdownTitle(matches, sectionLabel);

  return [
    { title: `Neosofia | ${sectionLabel} | ${title}` },
    { name: "description", content: "" },
  ];
}

export default function MarkdownPage({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);
  const section = parts[0] ?? 'content';
  const isBlogPost = section === 'blog' && parts.length > 1;
  const data = loaderData as LoadMDResult | undefined;

  if (!data) return null;

  const article = (
    <div className="prose-base">
      <RenderMD content={data.content} meta={isBlogPost ? data.meta : undefined} />
    </div>
  );

  return (
    <section id={section} className="">
      {isBlogPost ? (
        <BlogLayout toc={data.toc} meta={data.meta}>
          {article}
        </BlogLayout>
      ) : article}
    </section>
  );
}

