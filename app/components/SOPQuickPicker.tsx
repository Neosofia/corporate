import { QuickPicker } from './QuickPicker';

const groups = [
  {
    label: 'IT',
    items: [
      { label: 'System Backup and Recovery', path: '/qms/procedures/IT-245-SystemBackupandRecovery/' },
    ],
  },
  {
    label: 'Other',
    items: [{ label: 'All procedures', path: '/qms/procedures/' }],
  },
];

export function SOPQuickPicker() {
  return <QuickPicker label="Jump to SOP" pathPrefix="/qms/procedures" groups={groups} />;
}
