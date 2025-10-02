'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { themeAtom } from './theme-provider';
import { Button } from '@tool-jockey/ui';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/checkouts', label: 'Checkouts' },
  { href: '/calibration', label: 'Calibration' },
  { href: '/transfers', label: 'Transfers' },
  { href: '/reports', label: 'Reports' },
  { href: '/admin', label: 'Admin' },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tool Jockey</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Calibrated control for every wrench and widget.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Toggle {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
          <Button variant="ghost">Offline Ready</Button>
        </div>
      </header>
      <nav className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'rounded-full px-4 py-2 text-sm font-medium transition',
              pathname === item.href
                ? 'bg-brand-500 text-white shadow'
                : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200',
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
