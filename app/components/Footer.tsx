import { CodeBracketIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router'

import { ExternalLinkIcon } from './ExternalLinkIcon'

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
    <ul className="mt-3 space-y-2">{children}</ul>
  </div>
);

const FooterLink = ({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) =>
  external ? (
    <li><a className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ExternalLinkIcon />
    </a></li>
  ) : (
    <li><Link className="text-xs text-slate-400 hover:text-white transition" to={href}>{children}</Link></li>
  );

export const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 border-t border-slate-700/50">

        <div className="grid gap-10 lg:grid-cols-6">

          {/* Brand blurb */}
          <div className="lg:col-span-2">
            <Link to="/" aria-label="Go home" className="text-xl font-bold tracking-wide text-slate-200">
              Neosofia
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Giving organizations the tools and knowledge needed to deliver safe and effective services to their clients.
            </p>
          </div>

          <FooterColumn title="Neosofia">
            <FooterLink href="/resources/brand/">Brand Standards</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="/resources/privacy/">Privacy Policy</FooterLink>
          </FooterColumn>

          <FooterColumn title="Open Source">
            <FooterLink href="https://github.com/Neosofia/corporate" external>Corporate</FooterLink>
            <FooterLink href="https://github.com/Neosofia/sdk" external>SDK</FooterLink>
          </FooterColumn>

          <FooterColumn title="Community">
            <FooterLink href="https://github.com/Neosofia" external>GitHub</FooterLink>
          </FooterColumn>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex items-center justify-between border-t border-slate-700/50 pt-6">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Neosofia Inc. All rights reserved.
          </p>
          <a
            href="https://github.com/Neosofia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Neosofia on GitHub"
            className="text-slate-500 hover:text-white transition"
          >
            <CodeBracketIcon className="h-5 w-5" />
          </a>
        </div>

      </div>
    </footer>
  );
};


