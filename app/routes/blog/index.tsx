import { RenderMD, LoadMD } from "../../components/GetMD";
import type { Route } from "../../+types/root";

export async function loader({ params, request }: Route.LoaderArgs) {
  return LoadMD(params, request)
}

export function meta() {
  return [
    { title: "Neosofia | Blog Index" },
    { name: "description", content: "Explore the latest articles, insights, and updates from Neosofia's blog. Stay informed and inspired with our curated compliance content." },
  ]
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <section id="blog" className="">
      <div className="prose-base md:prose-lg">
        <RenderMD content={loaderData} />
      </div>
    </section>
  );
};

