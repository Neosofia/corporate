import { CodeBracketIcon } from '@heroicons/react/24/solid'

export const Footer = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
        <div className="md:max-w-md md:col-span-2">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >

            <span className="text-xl font-bold tracking-wide text-gray-500">
              Neosofia
            </span>
          </a>
          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-gray-500">
              Giving organizations the tools and knowledge needed to deliver safe and effective services to their clients
            </p>
            <p className="mt-4 text-sm text-gray-500">
              A multinational technology services company on a mission to create new wisdom in the compliance space.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Compliance</p>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li><a href="/blog/">Blog</a></li>
              <li><a href="/qms/">QMS</a></li>
              <li className="hidden"><a href="/qms/procedures">Procedures</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Resources</p>
            <ul className="mt-2 space-y-2 text-gray-600 hidden">
              <li><a href="/qms/glossary#tbd">Getting Started</a></li>
              <li><a href="/qms/glossary#tbd">Use Cases</a></li>
              <li><a href="/qms/glossary#tbd">Training</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Product</p>
            <ul className="mt-2 space-y-2 text-gray-600 hidden">
              <li><a href="/qms/glossary#tbd">Pricing</a></li>
              <li><a href="/qms/glossary#tbd">Support</a></li>
              <li><a href="/qms/glossary#tbd">Operational Status</a></li>
              <li><a href="/qms/glossary#tbd">Docs</a></li>
              <li><a href="/qms/glossary#tbd">Certifications</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Company</p>
            <ul className="mt-2 space-y-2 text-gray-600 hidden">
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
        <p className="text-sm/6 text-gray-600">
          © Copyright 2025 Neosofia Inc. All rights reserved.
        </p>
        { /* External Link Icons */}
        <div className="flex items-center space-x-4">
          <a href="https://github.com/Neosofia/corporate/" className="text-gray-500">
            <CodeBracketIcon className="size-6" />
          </a>
        </div>
      </div>
    </div>
  );
};
