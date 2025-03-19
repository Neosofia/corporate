import {RenderMD, LoadMD, ServerLoadMD } from "../../components/GetMD";
import type { Route } from "../../+types/root";

export async function clientLoader( { params, request }: Route.ClientLoaderArgs) {
  return LoadMD( params, request )
}

export async function loader( { params, request }: Route.LoaderArgs ) {
  return ServerLoadMD( params, request )
}

export function meta() {
  return [
    { title: "Neosofia | QMS Index" },
    { name: "description", content: "" },
  ]
}

export default function QMS( { loaderData }: Route.ComponentProps) {
  return (
    <section id="qms" className="min-h-screen flex justify-center items-center">
      <div className="max-w-5xl z-10 m-4 md:m-16 prose-base md:prose-lg overflow-x-auto">
      <RenderMD content={loaderData}/>
      </div>
    </section>
  );
}

