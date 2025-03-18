import {RenderMD, ClientLoadMD, ServerLoadMD } from "../GetMD";
import type { Route } from "../../../../app/+types/root";

export async function clientLoader( { params }: Route.ClientLoaderArgs ) {
  return ClientLoadMD( params, "blog" )
}

export async function loader( { params }: Route.LoaderArgs ) {
  return ServerLoadMD( params, "blog" )
}

export function meta({ matches }: Route.MetaArgs) {
  /* Find the first data block (md) for all of the route matches
   * This should typicaly be the second element in the array after the root route
   */
  const blog: string = (matches.find(match => typeof match?.data === 'string')?.data as string);
  const title = blog ? blog.match(/# (.*)/)?.[1] : "Post";

  return [
    { title: "Neosofia | Blog | " + title },
    { name: "description", content: "" },
  ]
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <section id="blog" className="min-h-screen flex justify-center items-center">
      <div className="max-w-5xl z-10 m-4 md:m-16 prose-base md:prose-lg overflow-x-auto">
        <RenderMD content={loaderData} />
      </div>
    </section>
  );
};

