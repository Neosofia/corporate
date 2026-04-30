import { useLocation, Link } from 'react-router';
import { useEffect, useState } from 'react';

import { DocumentIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/outline';

export const Breadcrumb = () => {
  const location = useLocation();

  // TBD: The caller should be in control of showing the PDF icon
  // or the breadcrumb in general.
  const allowedPaths = ['/qms/procedures/.*', '/qms/roles/', '/qms/glossary/'];
  const showPDF = allowedPaths.some((path) => {
    const regex = new RegExp(`^${path}$`);
    return regex.test(location.pathname);
  });

  if (location.pathname === '/') {
    return null;
  }
  const pathnames = location.pathname.split('/').filter((x) => x);
  const pdfURL = `${location.pathname.replace(/\/$/, '')}.pdf`;
  // TBD: pull this base url from the environment or client specific config file
  // Once we support GitHub/GitLab/etc. authentication we can conditionally show the edit link
  const mdEditURL = "https://github.com/Neosofia/corporate/edit/main" +
    location.pathname.replace(/\/$/, '') + ".md";

  const [pdfExists, setPdfExists] = useState(false);

  useEffect(() => {
    if (showPDF) {
      const checkPdfExists = async () => {
        try {
          const response = await fetch(pdfURL, { method: 'HEAD' });
          setPdfExists(response.ok);
        } catch (error) {
          setPdfExists(false);
        }
      };

      checkPdfExists();
    }
  }, [pdfURL, showPDF]);

  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
      <Link className="text-slate-400 hover:text-white transition" to="/">Home</Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        const sanitizedValue = value.replace(/_/g, ' ');

        const linkText = sanitizedValue
          .split(' ')
          .filter((word) => isNaN(Number(word)))
          .map((word) =>
            ["qms", "mvc"].includes(word) ?
              word.toUpperCase() :
              word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(' ');

        return (
          <span key={to} className="flex items-center gap-2" aria-current={isLast ? 'page' : undefined}>
            <span className="text-slate-600">/</span>
            {isLast ? (
              <span className="font-semibold text-slate-100">{linkText}</span>
            ) : (
              <Link className="text-slate-400 hover:text-white transition" to={to}>{linkText}</Link>
            )}
          </span>
        );
      })}

      {showPDF && pdfExists && (
        <span className="ml-auto flex items-center gap-2">
          <a href={mdEditURL} target="_blank" rel="noopener noreferrer" className="inline-block align-middle text-slate-400 hover:text-white transition">
            <PencilIcon className="h-4 w-4 md:h-5 md:w-5" />
          </a>
          <a href={pdfURL} className="inline-block align-middle text-slate-400 hover:text-white transition">
            <DocumentIcon className="h-4 w-4 md:h-5 md:w-5" />
          </a>
        </span>
      )}
    </nav>
  );
};
