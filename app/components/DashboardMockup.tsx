import { cn } from "@/lib/utils";

type MockupColor = "sky" | "violet" | "slate";

type MockupCardSize = "sm" | "md" | "lg";

const outerColor: Record<MockupColor, string> = {
  sky:    "bg-linear-to-br from-slate-900/70 via-sky-500/10 to-slate-950/85",
  violet: "bg-linear-to-br from-slate-900/70 via-violet-500/10 to-slate-950/85",
  slate:  "bg-linear-to-br from-slate-900/70 via-slate-950/85 to-slate-900/75",
};

const innerColor: Record<MockupColor, string> = {
  sky:    "bg-linear-to-br from-slate-800/60 via-sky-500/10 to-slate-900/75",
  violet: "bg-linear-to-br from-slate-800/60 via-violet-500/10 to-slate-900/75",
  slate:  "bg-linear-to-br from-slate-800/60 via-slate-950/90 to-slate-900/75",
};

const innerHeight: Record<MockupCardSize, string> = {
  sm: "h-16",
  md: "h-24",
  lg: "h-32",
};

const outerRounding: Record<MockupCardSize, string> = {
  sm: "rounded-[1.75rem]",
  md: "rounded-[2.5rem]",
  lg: "rounded-[2.5rem]",
};

const innerRounding: Record<MockupCardSize, string> = {
  sm: "rounded-[1.75rem]",
  md: "rounded-[1.75rem]",
  lg: "rounded-[2.25rem]",
};

const shadow: Record<MockupCardSize, string> = {
  sm: "shadow-inner shadow-slate-950/20",
  md: "shadow-lg shadow-slate-950/10",
  lg: "shadow-inner shadow-slate-950/20",
};

const padding: Record<MockupCardSize, string> = {
  sm: "p-4",
  md: "p-4",
  lg: "p-5",
};

function MockupCard({ color, size }: { color: MockupColor; size: MockupCardSize }) {
  return (
    <div className={cn("border border-slate-600/40", outerColor[color], outerRounding[size], shadow[size], padding[size])}>
      <div className={cn(innerColor[color], innerRounding[size], innerHeight[size])} />
    </div>
  );
}

export function DashboardMockup() {
  return (
    <div className="relative rounded-[2.5rem] bg-slate-950/95 p-8 sm:p-10 ring-1 ring-white/5">
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MockupCard color="sky"    size="sm" />
          <MockupCard color="violet" size="sm" />
          <MockupCard color="sky"    size="sm" />
          <MockupCard color="slate"  size="sm" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <MockupCard color="sky"    size="md" />
          <MockupCard color="violet" size="md" />
        </div>
        <MockupCard color="sky" size="lg" />
      </div>
    </div>
  );
}
