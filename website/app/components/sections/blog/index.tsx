import {RenderMD, ClientLoadMD, ServerLoadMD } from "../GetMD";
import type { Route } from "../../../../app/+types/root";

export async function clientLoader( { params }: Route.ClientLoaderArgs ) {
  return ClientLoadMD( params, "blog" )
}

export async function loader( { params }: Route.LoaderArgs ) {
  return ServerLoadMD( params, "blog" )
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

