import {RenderMD, LoadMD } from "../../components/GetMD";
import type { Route } from "../../+types/root";

export async function loader( { params, request }: Route.LoaderArgs ) {
  return LoadMD( params, request )
}

export function meta() {
  return [
    { title: "Neosofia | Resources" },
    { name: "description", content: "" },
  ]
}

export default function Blog( { loaderData }: Route.ComponentProps ) {
  return (
    <section id="resources" className="">
      <div className="prose-base md:prose-lg">        
      <RenderMD content={loaderData}/>
      </div>
    </section>
  );
};

