import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import "./index.css"

import { Navbar } from "./components/Navbar";
import { Footer } from './components/Footer';
import { Breadcrumb } from "./components/Breadcrumb";

export const links: Route.LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    as: "style",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

export function meta() {
  return [
    { title: "Neosofia" },
    { name: "description", content: "Neosofia -- New Wisdom" },
  ]
}


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return (
    <main className="bg-slate-900 text-gray-100">
      <Navbar />
      <section id="home" className="min-h-screen flex items-center justify-center relative">
      </section>
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <main className="bg-slate-900 text-gray-100">
      <Navbar />
      <div className="px-2 pt-10 md:pt-18 mx-auto max-w-5xl min-h-screen overflow-x-auto">
        <Breadcrumb />
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
