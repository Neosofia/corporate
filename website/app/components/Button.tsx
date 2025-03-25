import type { ReactNode } from 'react';
import { Link } from 'react-router';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  className = '',
  onClick,
}: ButtonProps) {
  const baseStyles = 'font-medium transition relative overflow-hidden rounded bg-slate-700 text-white py-3 px-6 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]';

  const buttonClasses = `${baseStyles} ${className}`;

  if (href) {
    return (
      <Link to={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
} 