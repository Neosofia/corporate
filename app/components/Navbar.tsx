import * as React from "react";
import { Link } from "react-router";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import logo from '../../app/assets/Neosofia.png';

type NavItem = {
  name: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
};

type NavCategory = {
  label: string;
  items: NavItem[];
};

const navigation: NavCategory[] = [
  {
    label: "For Devs and Sys Admins",
    items: [
      { name: "Tool Overview", href: "/tools" },
      { name: "SDKs", href: "https://github.com/Neosofia/sdk", external: true },
      { name: "Authentication", href: "https://github.com/Neosofia/authentication", external: true },
      { name: "Integrations", href: "https://github.com/Neosofia/sdk", external: true },
      { name: "Private Cloud", href: "https://github.com/Neosofia/infrastructure", external: true },
      { name: "Public Cloud (TBD)", href: "", disabled: true },
    ],
  },
  {
    label: "For Compliance",
    items: [
      { name: "QMS Overview", href: "/qms" },
      { name: "Policies", href: "/qms/policies/" },
      { name: "Procedures", href: "/qms/procedures/" },
      { name: "Glossary", href: "/qms/glossary/" },
    ],
  },
  {
    label: "Learn",
    items: [
      { name: "Blog", href: "/blog" },
      { name: "Resources", href: "/resources" },
    ],
  },
  {
    label: "Neosofia",
    items: [
      { name: "Contact us", href: "/contact" }
    ],
  },
];

export const Navbar = () => (
  <nav className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-lg border-b border-white/10 shadow-lg">
    <div className="max-w-5xl mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between h-16 md:h-18 gap-4">

        <Link to="/" className="flex items-center">
          <img src={logo} alt="Neosofia" className="h-8 md:h-10" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              {navigation.map((category) => (
                <NavigationMenuItem key={category.label}>
                  <NavigationMenuTrigger className="bg-transparent text-slate-300 hover:text-white data-open:text-white">
                    {category.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-48 rounded-2xl border border-white/10 bg-slate-950 text-slate-300 p-2 shadow-2xl shadow-black/40">
                    {category.items.map((item) => (
                      <NavLink key={item.name} item={item} />
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile hamburger + Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="text-white p-1"
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-slate-950 border-white/10 p-6 overflow-y-auto">
              <div className="mb-6">
                <SheetClose asChild>
                  <Link to="/" className="text-white text-lg font-semibold">
                    Neosofia
                  </Link>
                </SheetClose>
              </div>
              <div className="space-y-4">
                {navigation.map((category) => (
                  <div key={category.label} className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                    <p className="mb-3 text-base font-semibold text-white">{category.label}</p>
                    <div className="space-y-1">
                      {category.items.map((item) => (
                        <SheetClose asChild key={item.name}>
                          <NavLink item={item} />
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </div>
  </nav>
);

type NavLinkProps = {
  item: NavItem
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ item, className, ...props }, ref) => {
    const classes = cn(
      "block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white",
      className
    )

    if (item.disabled) {
      return (
        <span className="block rounded-xl px-3 py-2 text-sm text-slate-600 cursor-not-allowed select-none">
          {item.name}
        </span>
      )
    }

    if (item.external) {
      return (
        <a
          ref={ref}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          className={`${classes} inline-flex items-center gap-1.5`}
          {...props}
        >
          {item.name}
          <ArrowTopRightOnSquareIcon className="h-3 w-3 shrink-0 opacity-50" aria-hidden="true" />
        </a>
      )
    }

    return (
      <Link ref={ref} to={item.href} className={classes} {...props}>
        {item.name}
      </Link>
    )
  }
)

NavLink.displayName = "NavLink"


