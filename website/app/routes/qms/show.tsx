import { RenderMD, LoadMD } from "../../components/GetMD";
import type { Route } from "../../+types/root";
import { Breadcrumb } from "../../components/Breadcrumb";

export async function loader({ params, request }: Route.LoaderArgs) {
  return LoadMD(params, request)
}

export function meta() {
  return [
    { title: "Neosofia | QMS " },
    { name: "description", content: "" },
  ]
}

export default function QMS({ loaderData }: Route.ComponentProps) {
  return (
    <section id="qms" className="min-h-screen flex justify-center">
      <div className="w-5xl z-10 mt-8 md:mt-18 prose-base md:prose-lg overflow-x-auto">
        <Breadcrumb showPDF={true} />
        <RenderMD content={loaderData} />
      </div>
    </section>
  );
}

