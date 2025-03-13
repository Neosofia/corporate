import { RenderMD } from "../GetMD";

export const QMS = () => {
  return (
    <section id="qms" className="min-h-screen flex justify-center items-center">
      <div className="max-w-5xl z-10 m-4 md:m-16 prose-base md:prose-lg overflow-x-auto">
        <RenderMD />
      </div>
    </section>
  );
}

