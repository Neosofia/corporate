import { Link, useLocation } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface PickerItem {
  label: string;
  path: string;
}

interface PickerGroup {
  label: string;
  items: PickerItem[];
}

interface QuickPickerProps {
  label: string;
  pathPrefix: string;
  groups: PickerGroup[];
}

export function QuickPicker({ label, pathPrefix, groups }: QuickPickerProps) {
  const location = useLocation();

  if (!location.pathname.startsWith(pathPrefix)) {
    return null;
  }

  return (
    <div className="mb-6 max-w-xl">
      <NavigationMenu viewport={false} className="relative inline-block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100 shadow-sm transition hover:bg-slate-900 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-500/50">
              {label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-80 rounded-2xl border border-white/10 bg-slate-950 text-slate-300 p-4 shadow-2xl shadow-black/40">
              <div className="space-y-4">
                {groups.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{group.label}</p>
                    <div className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <NavigationMenuLink key={item.path} asChild>
                          <Link
                            to={item.path}
                            className="block rounded-xl px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800"
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
