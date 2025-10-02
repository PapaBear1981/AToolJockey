import './globals.css';
import type { Metadata } from 'next';
import { ReactQueryProvider } from '../src/components/react-query-provider';
import { ThemeProvider } from '../src/components/theme-provider';

export const metadata: Metadata = {
  title: 'Tool Jockey',
  description: 'Tool control and calibration platform',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ReactQueryProvider>
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900">
              {children}
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
