export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-slate-900/95 via-slate-900/65 to-transparent" />

        <div className="relative mx-auto max-w-6xl py-6 lg:py-12">
          <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">
                Open-source platform engineering
              </p>
              <h1 className="mt-4 lg:mt-8 text-2xl font-semibold tracking-tight text-white sm:text-xl lg:text-5xl">
                Building compliant platforms is hard, but it doesn't have to be.
              </h1>
              <p className="mt-4 lg:mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                Ship platform infrastructure with ready-made SDKs, policy automation, and expert guidance that keeps your teams moving.
              </p>

              <div className="mt-6 lg:mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="/tools"
                  className="inline-flex w-full justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 sm:w-auto"
                >
                  Start Building
                </a>
                <a
                  href="mailto:consulting@neosofia.tech"
                  className="inline-flex w-full justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-300 hover:text-sky-300 sm:w-auto"
                >
                  Contact us
                </a>
              </div>
            </div>

            <div className="hidden lg:block relative rounded-[3rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 sm:p-8">
              <div className="relative rounded-[2.5rem] bg-slate-950/95 p-8 sm:p-10 ring-1 ring-white/5">
                <div className="grid gap-6">
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-[1.75rem] border border-slate-800/60 bg-linear-to-br from-slate-900/70 via-sky-600/10 to-slate-900/75 p-5 shadow-inner shadow-slate-950/20">
                      <div className="h-20 rounded-[1.75rem] bg-linear-to-br from-slate-800/60 via-sky-500/10 to-slate-900/75" />
                    </div>
                    <div className="rounded-[1.75rem] border border-slate-800/60 bg-linear-to-br from-slate-900/70 via-violet-600/10 to-slate-900/75 p-5 shadow-inner shadow-slate-950/20">
                      <div className="h-20 rounded-[1.75rem] bg-linear-to-br from-slate-800/60 via-violet-500/10 to-slate-900/75" />
                    </div>
                    <div className="rounded-[1.75rem] border border-slate-800/60 bg-linear-to-br from-slate-900/70 via-sky-500/10 to-slate-900/75 p-5 shadow-inner shadow-slate-950/20">
                      <div className="h-20 rounded-[1.75rem] bg-linear-to-br from-slate-800/60 via-sky-400/10 to-slate-900/75" />
                    </div>
                    <div className="rounded-[1.75rem] border border-slate-800/60 bg-linear-to-br from-slate-900/70 via-slate-950/85 to-slate-900/75 p-5 shadow-inner shadow-slate-950/20">
                      <div className="h-20 rounded-[1.75rem] bg-linear-to-br from-slate-800/60 via-slate-950/90 to-slate-900/75" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="rounded-[2.5rem] border border-slate-800/60 bg-linear-to-br from-slate-900/70 via-sky-500/10 to-slate-950/85 p-5 shadow-lg shadow-slate-950/10">
                      <div className="h-28 rounded-[1.75rem] bg-linear-to-br from-slate-800/60 via-sky-500/10 to-slate-900/75" />
                    </div>
                    <div className="rounded-[2.5rem] border border-slate-800/60 bg-linear-to-br from-slate-900/70 via-violet-500/10 to-slate-950/85 p-5 shadow-lg shadow-slate-950/10">
                      <div className="h-28 rounded-[1.75rem] bg-linear-to-br from-slate-800/60 via-violet-500/10 to-slate-900/75" />
                    </div>
                  </div>
                  <div className="rounded-[2.5rem] border border-slate-800/60 bg-linear-to-br from-slate-900/70 via-sky-500/10 to-slate-950/85 p-6 shadow-inner shadow-slate-950/20">
                    <div className="h-44 rounded-[2.25rem] bg-linear-to-br from-slate-800/60 via-sky-500/10 to-slate-900/75" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-slate-950/10 bg-slate-950 text-white rounded-4xl overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-linear-to-b from-slate-900/10 to-transparent" />
        <div className="mx-auto max-w-6xl m-8 p-8">
          <div className="max-w-5xl">
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Tools built for platform velocity.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              Reusable SDKs, QMS generators, and infrastructure scripts keep teams aligned and reduce costly rework. Generate compliant documentation from standard templates and platform metadata. Use consistent authentication, access control, and workflow-building blocks across projects.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <a href="https://github.com/Neosofia/infrastructure" className="inline-flex w-full justify-center rounded-full bg-slate-800/80 px-6 py-3 text-sm font-semibold text-white shadow-inner shadow-slate-950/20 transition hover:bg-slate-700">
                Build Your Own Cloud
              </a>
              <a href="https://github.com/Neosofia/cdp" className="inline-flex w-full justify-center rounded-full bg-slate-800/80 px-6 py-3 text-sm font-semibold text-white shadow-inner shadow-slate-950/20 transition hover:bg-slate-700">
                Build Your Own Platform
              </a>
              <a href="https://github.com/Neosofia/sdk" className="inline-flex w-full justify-center rounded-full bg-slate-800/80 px-6 py-3 text-sm font-semibold text-white shadow-inner shadow-slate-950/20 transition hover:bg-slate-700">
                Integrate with your platform
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
