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
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-wide text-gray-800">Us</p>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li><a href="/#about">About</a></li>
              <li><a href="/#contact">Contact</a></li>
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
