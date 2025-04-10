import { RenderMD, LoadMD } from "../../components/GetMD";
import type { Route } from "../../+types/root";


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
    <section id="qms" className="">
      <div className="prose-base md:prose-lg">
        <RenderMD content={loaderData} />
      </div>
    </section>
  );
}

