import { CodeBracketIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid'

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="min-w-[7rem]">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
    <ul className="mt-3 space-y-2">{children}</ul>
  </div>
);

const FooterLink = ({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) =>
  external ? (
    <li><a className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowTopRightOnSquareIcon className="h-3 w-3 shrink-0 opacity-50" aria-hidden="true" />
    </a></li>
  ) : (
    <li><Link className="text-xs text-slate-400 hover:text-white transition" to={href}>{children}</Link></li>
  );

export const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-2">
        <hr className="border-slate-700/50 mb-5" />

        <div className="flex flex-wrap items-start gap-10">
          <FooterColumn title="Neosofia">
            <FooterLink href="/resources/website/about-us/">About Us</FooterLink>
            <FooterLink href="/resources/website/brand/">Brand Standards</FooterLink>
            <FooterLink href="/resources/website/thanks/">Thanks</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="/resources/website/privacy/">Privacy Policy</FooterLink>
            <FooterLink href="/resources/website/code-of-conduct/">Code of Conduct</FooterLink>
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
        <div className="mt-4 flex items-center justify-between border-t border-slate-700/50 pt-4">
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


