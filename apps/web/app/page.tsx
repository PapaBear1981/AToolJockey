import Link from 'next/link';
import { DashboardShell } from '../src/components/dashboard-shell';

export default function Home() {
  return (
    <DashboardShell>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/inventory"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-semibold">Inventory</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Search, filter, and manage tool status. Works offline with automatic sync.
          </p>
        </Link>
        <Link
          href="/checkouts"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-semibold">Checkouts</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Scan barcodes, enforce calibration and quarantine rules, capture overrides.
          </p>
        </Link>
        <Link
          href="/reports"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Monitor calibration due dates, quarantine aging, and utilization trends.
          </p>
        </Link>
      </div>
    </DashboardShell>
  );
}
