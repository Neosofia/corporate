import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
    {
      // React 19 reorders <link> and <script> elements in <head> during
      // prerendering (resource hoisting) in a way that differs from React
      // Router 7's <Links /> render order during client hydration.
      // The page renders correctly after React's automatic recovery.
      // Log in development so mismatches are still visible locally.
      onRecoverableError(error: unknown) {
        if (import.meta.env.DEV) {
          console.error("React recoverable error:", error);
        }
      },
    }
  );
});
