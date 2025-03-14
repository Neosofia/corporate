import { RenderMD } from "../GetMD";
import type { Route } from "./+types/blog";

export async function clientLoader( { params }: Route.ClientLoaderArgs ) {
    let filename = `/blog/${params.id || 'readme'}.md`

    const res = await fetch(filename);
    const content = await res.text();

    return content;
}

export default function Blog({
  loaderData,
}: Route.ComponentProps) {
  return (
    <section id="blog" className="min-h-screen flex justify-center items-center">
      <div className="max-w-5xl z-10 m-4 md:m-16 prose-base md:prose-lg overflow-x-auto">
      <RenderMD content={loaderData}/>
      </div>
    </section>
  );
};

