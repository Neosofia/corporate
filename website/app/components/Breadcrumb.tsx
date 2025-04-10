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
  const mdEditURL = "https://github.com/Neosofia/corporate/edit/main/website/" +
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
    <nav
      className="grid grid-flow-col-dense text-xs md:text-base h-4 md:h-8 text-gray-500"
      aria-label="Breadcrumb">

      <span className="w-fit">
        <Link to="/">Home</Link>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          const sanitizedValue = value.replace(/_/g, ' ');

          const linkText = sanitizedValue
            .split(' ')
            .filter((word) => isNaN(Number(word)))
            .map((word) =>
              /* TBD: Cheap hack until we scrape the glossary for abbreviations. */
              ["qms", "mvc"].includes(word) ?
                word.toUpperCase() :
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(' ');

          return (
            <span
              key={to}
              className={`text-gray-500 ${isLast ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            > {" | "}
              {isLast ? (linkText) : (<Link to={to}>{linkText}</Link>)}
            </span>
          );
        })}
      </span>

      {showPDF && pdfExists && (
        <span className="justify-self-end">
          <a href={mdEditURL} target="_blank" rel="noopener noreferrer" className="inline-block align-middle mr-2">
            <PencilIcon className="h-3 w-3 md:h-6 md:w-6" />
          </a>
          <a href={pdfURL} className="inline-block align-middle">
            <DocumentIcon className="h-3 w-3 md:h-6 md:w-6" />
          </a>
        </span>
      )}
    </nav>
  );
};
