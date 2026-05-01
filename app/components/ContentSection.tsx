import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ContentCTA {
  label: string;
  href: string;
}

interface ContentSectionProps {
  heading: string;
  description: string;
  ctas?: ContentCTA[];
  children?: ReactNode;
}

export function ContentSection({ heading, description, ctas = [], children }: ContentSectionProps) {
  return (
    <section className="relative border-t border-slate-950/10 bg-slate-950 text-white rounded-4xl overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-linear-to-b from-slate-900/10 to-transparent" />
      <div className="mx-auto max-w-6xl m-8 p-8">
        <div className="max-w-5xl">
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
            {description}
          </p>

          {ctas.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {ctas.map(({ label, href }) => (
                <Button
                  key={href}
                  asChild
                  variant="ghost"
                  className="w-full rounded-full bg-slate-800/80 text-white hover:bg-slate-700 hover:text-white"
                >
                  <a href={href}>{label}</a>
                </Button>
              ))}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
