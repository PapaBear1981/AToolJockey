import { DashboardShell } from '../../src/components/dashboard-shell';

const reportEmbeds = [
  {
    title: 'Calibration Compliance',
    description: 'Upcoming due dates, overdue assets, and exception approvals.',
  },
  {
    title: 'Quarantine Aging',
    description: 'Track how long tools remain quarantined and unblock bottlenecks.',
  },
  {
    title: 'Utilization Trends',
    description: 'Monitor checkouts to spot underused or overworked assets.',
  },
];

export default function ReportsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold">Reports</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Metabase embeds will appear here. Each card represents a saved question or dashboard
            that will render inline once credentials are configured.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-2">
          {reportEmbeds.map((report) => (
            <section
              key={report.title}
              className="rounded-xl border border-dashed border-slate-300 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">{report.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{report.description}</p>
                </div>
                <div className="flex aspect-video items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                  Metabase embed placeholder
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
