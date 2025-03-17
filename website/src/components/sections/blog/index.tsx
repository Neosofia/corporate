import {RenderMD, LoadMD } from "../GetMD";
import type { Route } from "../../../../app/+types/root";

export async function loader( { params }: Route.LoaderArgs ) {
  return LoadMD(params)
}

export function meta() {
  return [
    { title: "Neosofia | Blog Index" },
    { name: "description", content: "Explore the latest articles, insights, and updates from Neosofia's blog. Stay informed and inspired with our curated compliance content." },
  ]
}

export default function Blog( { loaderData }: Route.ComponentProps ) {
  return (
    <section id="blog" className="min-h-screen flex justify-center items-center">
      <div className="max-w-5xl z-10 m-4 md:m-16 prose-base md:prose-lg overflow-x-auto">
      <RenderMD content={loaderData}/>
      </div>
    </section>
  );
};

