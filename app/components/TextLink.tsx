import type { ReactNode } from "react";
import { Link } from "react-router";

type TextLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
};

const defaultStyles =
  "text-sky-300 underline decoration-sky-300 hover:text-sky-200 hover:decoration-sky-200 underline-offset-2 transition";

export function TextLink({ to, children, className = "" }: TextLinkProps) {
  const classes = `${defaultStyles} ${className}`.trim();
  const isExternal = /^(https?:|mailto:|tel:)/.test(to);

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}
