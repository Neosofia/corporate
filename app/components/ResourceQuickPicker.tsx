import { Link, useLocation } from 'react-router';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

const groups = [
  {
    label: 'Checklists',
    items: [
      { label: 'Level 1 Checklist', path: '/resources/checklists/level1/' },
      { label: 'Level 2 Checklist', path: '/resources/checklists/level2/' },
      { label: 'Level 3 Checklist', path: '/resources/checklists/level3/' },
    ],
  },
  {
    label: 'Other',
    items: [{ label: 'All resources', path: '/resources/' }],
  },
];

export function ResourceQuickPicker() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (!location.pathname.startsWith('/resources')) {
    return null;
  }

  return (
    <div className="mb-6 max-w-xl">
      <div
        className="relative inline-block"
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
      >
        <Button
          className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100 shadow-sm transition hover:bg-slate-900 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-500/50"
          onFocus={() => setOpen(true)}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          Jump to resource
        </Button>

        {open && (
          <div className="absolute left-0 z-50 mt-2 min-w-60 rounded-2xl border border-white/10 bg-slate-950 text-slate-300 p-4 shadow-2xl shadow-black/40">
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{group.label}</p>
                  <div className="mt-2 space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
