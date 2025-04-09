import { RenderMD, LoadMD } from "../../components/GetMD";
import type { Route } from "../../+types/root";
import { Breadcrumb } from "../../components/Breadcrumb";

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
    <section id="blog" className="min-h-screen flex justify-center items-center">
      <div className="w-5xl z-10 mt-8 md:mt-18 prose-base md:prose-lg overflow-x-auto">
        <Breadcrumb />
        <RenderMD content={loaderData} />
      </div>
    </section>
  );
};

