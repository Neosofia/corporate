import { Fragment } from 'react';
import { useLocation, Link } from 'react-router';
import { useEffect, useState } from 'react';

import { DocumentIcon, PencilIcon } from '@heroicons/react/24/outline';

import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const Breadcrumb = () => {
  const location = useLocation();

  const allowedPaths = ['/qms/procedures/.*', '/qms/roles/', '/qms/glossary/'];
  const showPDF = allowedPaths.some((path) => new RegExp(`^${path}$`).test(location.pathname));

  if (location.pathname === '/') return null;

  const pathnames = location.pathname.split('/').filter((x) => x);
  const pdfURL = `${location.pathname.replace(/\/$/, '')}.pdf`;
  const mdEditURL = "https://github.com/Neosofia/corporate/edit/main" +
    location.pathname.replace(/\/$/, '') + ".md";

  const [pdfExists, setPdfExists] = useState(false);

  useEffect(() => {
    if (!showPDF) return;
    fetch(pdfURL, { method: 'HEAD' })
      .then((r) => setPdfExists(r.ok))
      .catch(() => setPdfExists(false));
  }, [pdfURL, showPDF]);

  const toLabel = (value: string) =>
    value.replace(/_/g, ' ')
      .split(' ')
      .filter((word) => isNaN(Number(word)))
      .map((word) =>
        ["qms", "mvc"].includes(word)
          ? word.toUpperCase()
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');

  return (
    <BreadcrumbRoot className="pt-3 pb-2 mb-3">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <Fragment key={to}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{toLabel(value)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{toLabel(value)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}

        {showPDF && pdfExists && (
          <BreadcrumbItem className="ml-auto flex items-center gap-2">
            <a href={mdEditURL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
              <PencilIcon className="h-4 w-4 md:h-5 md:w-5" />
            </a>
            <a href={pdfURL} className="text-slate-400 hover:text-white transition">
              <DocumentIcon className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};
