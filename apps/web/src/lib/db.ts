import Dexie, { Table } from 'dexie';
import type { Tool } from '@tool-jockey/types';

export interface PendingMutation {
  id: string;
  endpoint: string;
  payload: Record<string, unknown>;
  createdAt: number;
}

export class OfflineDatabase extends Dexie {
  tools!: Table<Tool>;
  pending!: Table<PendingMutation>;

  constructor() {
    super('tool-jockey');
    this.version(1).stores({
      tools: 'id,toolNumber,status,warehouseId',
      pending: 'id,endpoint',
    });
  }
}

export const db = new OfflineDatabase();
