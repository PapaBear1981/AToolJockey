import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  const base = 'px-4 py-2 rounded font-semibold transition focus:outline-none focus:ring';
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-200',
  };

  return <button className={clsx(base, styles[variant], className)} {...props} />;
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    SERVICEABLE: 'bg-emerald-100 text-emerald-800',
    QUARANTINED: 'bg-amber-100 text-amber-800',
    CHECKED_OUT: 'bg-blue-100 text-blue-800',
    IN_TRANSIT: 'bg-purple-100 text-purple-800',
    OUT_OF_SERVICE: 'bg-rose-100 text-rose-800',
  };

  return (
    <span className={clsx('inline-flex items-center px-2 py-1 text-xs font-semibold rounded', map[status] ?? 'bg-slate-100 text-slate-800')}>
      {status.replaceAll('_', ' ')}
    </span>
  );
};

export interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, children }) => (
  <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    <header className="mb-2">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      {description ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
      ) : null}
    </header>
    <div className="text-sm text-slate-700 dark:text-slate-200">{children}</div>
  </section>
);

export const LoadingSpinner: React.FC<{ label?: string }> = ({ label = 'Loading…' }) => (
  <div role="status" aria-live="polite" className="flex flex-col items-center gap-2">
    <svg className="h-6 w-6 animate-spin text-blue-600" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
  </div>
);
