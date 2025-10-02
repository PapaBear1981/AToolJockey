import { Suspense } from 'react';
import { DashboardShell } from '../../../src/components/dashboard-shell';
import { ToolInventoryTable } from '../../../src/components/tool-inventory-table';

export default function InventoryPage() {
  return (
    <DashboardShell>
      <Suspense fallback={<p>Loading inventory…</p>}>
        <ToolInventoryTable />
      </Suspense>
    </DashboardShell>
  );
}
