import { RenderMD, LoadMD } from "../../components/GetMD";
import type { Route } from "../../+types/root";

import { Breadcrumb } from "../../components/Breadcrumb";

export async function loader({ params, request }: Route.LoaderArgs) {
  return LoadMD(params, request)
}

export function meta() {
  return [
    { title: "Neosofia | QMS Index" },
    { name: "description", content: "" },
  ]
}

export default function QMS({ loaderData }: Route.ComponentProps) {
  return (
    <section id="qms" className="min-h-screen flex justify-center">
      <div className="max-w-5xl mt-8 md:mt-18 prose-base md:prose-lg overflow-x-auto">
        <Breadcrumb />
        <RenderMD content={loaderData} />
      </div>
    </section>
  );
}

