# Agent Guidelines — Corporate Website

## Tech Stack

When solving any problem, reach for these first before introducing something new:

| Concern | Chosen library |
|---|---|
| UI primitives | [shadcn/ui](https://ui.shadcn.com) (Radix preset, Nova theme) — components live in `app/components/ui/` |
| Icons | `@heroicons/react/24/outline` — always outline variant unless solid is required |
| Styling | Tailwind v4 — utility classes only; no custom CSS except `@layer components` in `app/index.css` for repeated patterns |
| Class merging | `cn()` from `app/lib/utils.ts` (`clsx` + `tailwind-merge`) |
| Routing | React Router v7 config-based (`app/routes.ts`) |
| Forms | TanStack Form (`@tanstack/react-form`) + Zod (`zod`) — use `form.Field` render props + `<Field>` / `<FieldLabel>` / `<FieldError>` from `app/components/ui/field.tsx` |
| Markdown | `react-markdown` + `remark-gfm` + `rehype-raw` + `rehype-slug` via `GetMD.tsx` |

## Solution Checklist

Before writing new code, ask:

1. **Is there a shadcn component for this?** Check `app/components/ui/` and [ui.shadcn.com](https://ui.shadcn.com/docs/components). Install with `pnpm dlx shadcn@latest add <name>`.
2. **Is there a Heroicon for this?** Browse [heroicons.com](https://heroicons.com) — import from `@heroicons/react/24/outline`.
3. **Is there an existing shared component?** Check `app/components/` before building a new one.
4. **Is this a pure function used in more than one place?** It belongs in `app/lib/utils.ts`.
5. **Is a Tailwind class string repeated 2+ times?** Extract it to a module-level `const` or `@layer components`.

## Dark-Theme CSS Variable Rule

shadcn CSS variables (`--popover`, `--muted`, `--foreground`, etc.) resolve to light-mode values in this app. If a shadcn component renders with the wrong colour, replace the CSS-variable class with an explicit Tailwind `slate`/`sky` colour directly in the `app/components/ui/` file. Do not change the component's public API.
