import { QuickPicker } from './QuickPicker';

const groups = [
  {
    label: 'Checklists',
    items: [
      { label: 'Level 1 Checklist', path: '/resources/checklists/level1/' },
      { label: 'Level 2 Checklist', path: '/resources/checklists/level2/' },
      { label: 'Level 3 Checklist', path: '/resources/checklists/level3/' },
      { label: 'SDLC Checklist', path: '/resources/checklists/sdlc/' },
    ],
  },
  {
    label: 'Guides',
    items: [
      { label: 'Documentation gold standards', path: '/resources/guides/documentation/' },
    ],
  },
  {
    label: 'Other',
    items: [{ label: 'All resources', path: '/resources/' }],
  },
];

export function ResourceQuickPicker() {
  return <QuickPicker label="Jump to resource" pathPrefix="/resources" groups={groups} />;
}
