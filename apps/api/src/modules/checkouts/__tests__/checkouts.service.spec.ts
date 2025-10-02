import { Test } from '@nestjs/testing';
import { CheckoutsService } from '../checkouts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { HistoryService } from '../../history/history.service';

const prismaMock = {
  tool: { findUnique: jest.fn() },
  $transaction: jest.fn(),
};

const historyMock = {
  record: jest.fn(),
};

describe('CheckoutsService', () => {
  let service: CheckoutsService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        CheckoutsService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: HistoryService, useValue: historyMock },
      ],
    }).compile();
    service = module.get(CheckoutsService);
  });

  it('blocks checkout when calibration is expired without override', async () => {
    prismaMock.tool.findUnique.mockResolvedValue({
      status: 'SERVICEABLE',
      calibration: { dueAt: new Date(Date.now() - 1000) },
      quarantine: null,
    });

    await expect(
      service.create({ toolId: 'tool', userId: 'user', actorId: 'actor', capability: [] }),
    ).rejects.toMatchObject({ response: { message: { code: 'checkout_blocked' } } });
  });

  it('allows checkout with override and reason', async () => {
    prismaMock.tool.findUnique.mockResolvedValue({
      status: 'SERVICEABLE',
      calibration: { dueAt: new Date(Date.now() - 1000) },
      quarantine: null,
    });

    prismaMock.$transaction.mockImplementation(async (cb: any) => {
      return cb({
        checkout: { create: jest.fn().mockResolvedValue({ id: 'checkout' }) },
        tool: { update: jest.fn() },
      });
    });

    const result = await service.create({
      toolId: 'tool',
      userId: 'user',
      actorId: 'actor',
      capability: ['checkout.override'],
      overrideReason: 'Manager approved',
    });

    expect(result).toEqual({ id: 'checkout' });
  });
});
