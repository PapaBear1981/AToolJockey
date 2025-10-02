import { HistoryService } from '../history.service';

describe('HistoryService', () => {
  it('calculates deterministic hash chain', async () => {
    const records: any[] = [];
    const client: any = {
      historyEvent: {
        findFirst: jest.fn().mockImplementation(() => records[records.length - 1] ?? null),
        create: jest.fn().mockImplementation(({ data }: any) => {
          const record = { ...data, occurredAt: new Date() };
          records.push(record);
          return record;
        }),
      },
    };

    const service = new HistoryService({} as any);
    await service.record(client, { toolId: 'tool', type: 'A', payload: { foo: 1 } });
    await service.record(client, { toolId: 'tool', type: 'B', payload: { foo: 2 } });

    expect(records[0].hashPrev).toBeNull();
    expect(records[1].hashPrev).toBe(records[0].hashThis);
  });
});
