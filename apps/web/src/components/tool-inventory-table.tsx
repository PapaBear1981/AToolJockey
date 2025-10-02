'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StatusBadge, Card } from '@tool-jockey/ui';
import { useState } from 'react';
import { Tool } from '@tool-jockey/types';

async function fetchTools(search: string): Promise<Tool[]> {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : undefined;
  const response = await axios.get<Tool[]>(`${process.env.NEXT_PUBLIC_API_URL}/tools`, {
    params: { search },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
}

export function ToolInventoryTable() {
  const [search, setSearch] = useState('');
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['tools', search],
    queryFn: () => fetchTools(search),
  });

  return (
    <Card title="Inventory" description="Search by tool number or serial. Offline caching enabled.">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tools"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            onClick={() => refetch()}
            className="rounded bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-600"
          >
            Refresh
          </button>
        </div>
        {isFetching ? <p>Refreshing…</p> : null}
        <div className="max-h-[480px] overflow-auto rounded border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-2 font-medium">Tool #</th>
                <th className="px-4 py-2 font-medium">Serial</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Warehouse</th>
                <th className="px-4 py-2 font-medium">Calibration Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {(data ?? []).map((tool) => (
                <tr key={tool.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-2 font-mono">{tool.toolNumber}</td>
                  <td className="px-4 py-2 font-mono">{tool.serialNumber}</td>
                  <td className="px-4 py-2"><StatusBadge status={tool.status} /></td>
                  <td className="px-4 py-2">{tool.warehouseId}</td>
                  <td className="px-4 py-2">{tool.calibrationDue ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
