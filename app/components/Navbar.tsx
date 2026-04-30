import { useEffect, useState } from "react";
import { Link } from "react-router";

import { ExternalLinkIcon } from "./ExternalLinkIcon";

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
    label: "For Devs",
    items: [
      { name: "Tool Overview", href: "/tools" },
      { name: "SDKs", href: "https://github.com/Neosofia/sdk", external: true },
      { name: "Authentication", href: "https://github.com/Neosofia/authentication", external: true },
      { name: "Integrations", href: "https://github.com/Neosofia/sdk", external: true },
    ],
  },
  {
    label: "For Sys Admins",
    items: [
      { name: "Tool Overview", href: "/tools" },
      { name: "Private Cloud", href: "https://github.com/Neosofia/infrastructure", external: true },
      { name: "Public Cloud (TBD)", href: "", disabled: true }
    ],
  },
  {
    label: "For Compliance",
    items: [
      { name: "QMS library", href: "/qms" },
      { name: "Checklists", href: "/resources" },
      { name: "Policies", href: "/qms/policies/" },
    ],
  },
  {
    label: "Learn",
    items: [
      { name: "Blog", href: "/blog" },
      { name: "Resources", href: "/resources" },
      { name: "Glossary", href: "/qms/glossary/" },
    ],
  },
  {
    label: "Contact",
    items: [
      { name: "Contact us", href: "/contact" },
      { name: "Consulting", href: "mailto:consulting@neosofia.tech", external: true },
    ],
  },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpenCategories, setMobileOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const toggleMobileCategory = (label: string) => {
    setMobileOpenCategories((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label]
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileOpenCategories([]);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-18 gap-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Neosofia" className="h-8 md:h-10" />
            </Link>

            {/* Mobile hamburger */}
            <div
              className={`cursor-pointer z-40 md:hidden text-xl text-white ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              onClick={() => setMenuOpen(true)}
            >
              &#9776;
            </div>

            {/* Desktop nav — pure CSS hover, no JS gap */}
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((category) => (
                <div key={category.label} className="group relative">
                  {/* Trigger */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 py-4 text-sm font-semibold text-slate-300 transition-colors group-hover:text-white"
                  >
                    {category.label}
                    <span className="text-slate-500 transition-transform group-hover:rotate-180">▾</span>
                  </button>

                  {/* Dropdown — shown via CSS group-hover, no JS */}
                  <div className="invisible absolute left-0 top-full z-50 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-56 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-black/40">
                      {category.items.map((item) => (
                        <NavLink key={item.name} item={item} onClick={closeMenu} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </nav>

      {/* Mobile menu overlay — rendered outside nav to sit above everything */}
      <div
        className={`fixed inset-0 bg-slate-950 z-50 transition-opacity duration-300 ease-in-out md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative flex h-full flex-col overflow-y-auto p-6 pt-5">
          <button
            type="button"
            onClick={closeMenu}
            className="absolute top-0 right-0 h-16 px-4 flex items-center text-white text-2xl leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            aria-label="Close Menu"
          >
            &times;
          </button>

          <div className="flex items-center h-16">
            <Link to="/" onClick={closeMenu} className="text-white text-lg font-semibold">
              Neosofia
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            {navigation.map((category) => {
              const isOpen = mobileOpenCategories.includes(category.label);
              return (
                <div key={category.label} className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                  <button
                    type="button"
                    onClick={() => toggleMobileCategory(category.label)}
                    className="flex w-full items-center justify-between text-left text-base font-semibold text-white"
                    aria-expanded={isOpen}
                  >
                    {category.label}
                    <span className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                      ▾
                    </span>
                  </button>

                  <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "mt-3 max-h-96" : "max-h-0"}`}>
                    <div className="space-y-1 pt-1">
                      {category.items.map((item) => (
                        <NavLink key={item.name} item={item} onClick={closeMenu} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

function NavLink({ item, onClick }: { item: NavItem; onClick: () => void }) {
  const classes = "block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white";

  if (item.disabled) {
    return (
      <span className="block rounded-xl px-3 py-2 text-sm text-slate-600 cursor-not-allowed select-none">
        {item.name}
      </span>
    );
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer noopener" onClick={onClick} className={`${classes} inline-flex items-center gap-1.5`}>
        {item.name}
        <ExternalLinkIcon />
      </a>
    );
  }

  return (
    <Link to={item.href} onClick={onClick} className={classes}>
      {item.name}
    </Link>
  );
}

