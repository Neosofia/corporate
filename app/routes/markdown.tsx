import { useLocation } from 'react-router';
import { RenderMD, LoadMD } from "../components/GetMD";
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
  const section = pathname.split('/').filter(Boolean)[0] ?? 'content';

  return (
    <section id={section} className="">
      <div className="prose-base md:prose-lg">
        <RenderMD content={loaderData} />
      </div>
    </section>
  );
}
