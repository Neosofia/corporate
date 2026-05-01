import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroCTA {
  label: string;
  href: string;
  variant?: "default" | "outline";
}

const heroCTAStyles: Record<NonNullable<HeroCTA["variant"]>, string> = {
  default:
    "bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400",
  outline:
    "border border-white/10 bg-white/5 text-white hover:border-sky-300 hover:text-sky-300",
};

interface HeroSectionProps {
  eyebrow?: string;
  heading: string;
  description: string;
  ctas?: HeroCTA[];
  visual?: ReactNode;
}

export function HeroSection({ eyebrow, heading, description, ctas = [], visual }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-slate-900/95 via-slate-900/65 to-transparent" />

      <div className="relative mx-auto max-w-6xl py-6 lg:py-12">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">{eyebrow}</p>
            )}
            <h1 className="mt-4 lg:mt-8 text-2xl font-semibold tracking-tight text-white sm:text-xl lg:text-5xl">
              {heading}
            </h1>
            <p className="mt-4 lg:mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              {description}
            </p>

            {ctas.length > 0 && (
              <div className="mt-6 lg:mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                {ctas.map(({ label, href, variant = "default" }) => (
                  <Button
                    key={href}
                    asChild
                    variant={variant}
                    size="lg"
                    className={cn("w-full rounded-full sm:w-auto", heroCTAStyles[variant ?? "default"])}
                  >
                    <a href={href}>{label}</a>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {visual && (
            <div className="hidden lg:block relative rounded-[3rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 sm:p-8">
              {visual}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
