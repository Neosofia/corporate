import { TextLink } from "./TextLink";

type CardPoint =
  | string
  | {
      label: string;
      href: string;
      prefix?: string;
      suffix?: string;
    };

type InfoCardProps = {
  title: string;
  subtitle: string;
  points: CardPoint[];
};

export function InfoCard({ title, subtitle, points }: InfoCardProps) {
  return (
    <article className="rounded-4xl border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-3 text-slate-300 leading-7">{subtitle}</p>
      <ul className="mt-4 space-y-2 text-slate-300">
        {points.map((point) => (
          <li key={typeof point === "string" ? point : point.href + point.label}>
            {typeof point === "string" ? (
              point
            ) : (
              <>
                {point.prefix}
                <TextLink to={point.href}>{point.label}</TextLink>
                {point.suffix}
              </>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
