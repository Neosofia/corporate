import { CodeBracketIcon } from '@heroicons/react/24/solid'

export const Footer = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-0" id="footer">
      <div className="grid gap-16 row-gap-10 mb-6 mt-4 lg:grid-cols-6 border-t">
        <div className="md:max-w-md mt-4 md:col-span-2">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >

            <span className="text-xl font-bold tracking-wide text-gray-400">
              Neosofia
            </span>
          </a>
          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-gray-400">
              Giving organizations the tools and knowledge needed to deliver safe and effective services to their clients
            </p>
            <p className="mt-4 text-sm text-gray-400">
              A multinational technology services company on a mission to create new wisdom in the compliance space.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-4 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
          <div>
            <p className="tracking-wide text-gray-400">Company</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/blog/">Blog</a></li>
              <li><a href="/qms/">QMS</a></li>
              <li><a href="/resources/privacy/">Privacy Policy</a></li>
              <li><a href="/qms/glossary/">Glossary</a></li>
              <li><a href="/qms/policies/">Policies</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-400">Resources</p>
            <ul className="mt-2 space-y-2text-gray-400">
              <li><a href="/resources/">Getting Started</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-400">Product</p>
            <ul className="mt-2 space-y-2text-gray-400 hidden">
              <li><a href="/qms/glossary#tbd">Pricing</a></li>
              <li><a href="/qms/glossary#tbd">Support</a></li>
              <li><a href="/qms/glossary#tbd">Operational Status</a></li>
              <li><a href="/qms/glossary#tbd">Docs</a></li>
              <li><a href="/qms/glossary#tbd">Certifications</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-400">Engage</p>
            <ul className="mt-2 space-y-2text-gray-400 hidden">
              <li><a href="/qms/glossary#tbd">Brand</a></li>
              <li><a href="/qms/glossary#tbd">News & Press</a></li>
              <li><a href="/qms/glossary#tbd">Careers</a></li>
              <li><a href="/qms/glossary#tbd">Events</a></li>
              <li><a href="/qms/glossary#tbd">Legal</a></li>
              <li><a href="/qms/glossary#tbd">Leadership</a></li>
              <li><a href="/qms/glossary#tbd">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 pb-10 border-t">
        <p className="text-sm/6 text-gray-400">
        Copyright © 2025 Neosofia Inc. All rights reserved.
        </p>
        { /* External Link Icons */}
        <div className="flex items-center space-x-4">
          <a href="https://github.com/Neosofia/corporate/" aria-label="Neosofia GitHub" className="text-gray-400">
            <CodeBracketIcon className="size-6" />
          </a>
        </div>
      </div>
    </div>
  );
};
