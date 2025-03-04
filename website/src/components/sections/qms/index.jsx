import React from "react";

import { Navbar } from "../../Navbar";

import { RenderMD } from "../GetMD";

export const QMS = () => {

  
  return (
    <div className={`bg-slate-900 text-gray-100`}>
      <Navbar />

      <section id="qms" className="min-h-screen flex flex-col py-10 justify-center items-center">
          <div className="max-w-4xl z-10 m-8 md:m-16 prose-sm md:prose-md overflow-x-auto relative">
            <RenderMD />
          </div>
      </section>
    </div>
  );
}

