import { cacheTools, getCachedTools, queueMutation } from '../lib/offline-sync';
import { db } from '../lib/db';

describe('offline sync helpers', () => {
  beforeEach(async () => {
    await db.tools.clear();
    await db.pending.clear();
  });

  it('stores cached tools', async () => {
    await cacheTools([{ id: '1', toolNumber: 'TL-1', serialNumber: 'SN', status: 'SERVICEABLE', warehouseId: 'WH', calibrationDue: null }]);
    const tools = await getCachedTools();
    expect(tools).toHaveLength(1);
  });

  it('queues mutations', async () => {
    await queueMutation('/checkouts', { toolId: '1' });
    const pending = await db.pending.toArray();
    expect(pending).toHaveLength(1);
  });
});
