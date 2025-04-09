import { useLocation, Link } from 'react-router';
import { useEffect, useState } from 'react';

import { DocumentIcon } from '@heroicons/react/24/outline';

export const Breadcrumb = ({ showPDF = false }: { showPDF?: boolean }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const pdf = `${location.pathname.replace(/\/$/, '')}.pdf`;

  const [pdfExists, setPdfExists] = useState(false);

  useEffect(() => {
    if (showPDF) {
      const checkPdfExists = async () => {
        try {
          const response = await fetch(pdf, { method: 'HEAD' });
          setPdfExists(response.ok);
        } catch (error) {
          setPdfExists(false);
        }
      };

      checkPdfExists();
    }
  }, [pdf, showPDF]);

  return (
    <nav
      className="grid grid-flow-col-dense spacing-2 mt-18 p-0 text-gray-500 max-w-5xl mx-auto"
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
        <span className="justify-self-end m-0 p-0 mt-1">
          <a href={pdf} className="inline-block items-center">
            <DocumentIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
          </a>
        </span>
      )}
    </nav>
  );
};
