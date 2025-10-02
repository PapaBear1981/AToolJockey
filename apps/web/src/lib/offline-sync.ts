import axios from 'axios';
import { db, PendingMutation } from './db';
import { v4 as uuid } from 'uuid';

export async function queueMutation(endpoint: string, payload: Record<string, unknown>) {
  await db.pending.put({ id: uuid(), endpoint, payload, createdAt: Date.now() });
}

export async function flushQueue(token?: string) {
  const mutations = await db.pending.orderBy('createdAt').toArray();
  for (const mutation of mutations) {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${mutation.endpoint}`, mutation.payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      await db.pending.delete(mutation.id);
    } catch (error) {
      console.error('Failed to replay mutation', mutation, error);
      break;
    }
  }
}

export async function cacheTools(tools: any[]) {
  await db.tools.bulkPut(tools);
}

export async function getCachedTools() {
  return db.tools.toArray();
}
