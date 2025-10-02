import { PrismaClient, ToolStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const warehouses = await prisma.warehouse.createMany({
    data: [
      { id: randomUUID(), code: 'GEG', name: 'Spokane Warehouse' },
      { id: randomUUID(), code: 'DFW', name: 'Dallas Warehouse' },
      { id: randomUUID(), code: 'CIC', name: 'Chico Warehouse' },
    ],
    skipDuplicates: true,
  });
  console.log(`Seeded warehouses: ${warehouses.count}`);

  const torqueType = await prisma.toolType.upsert({
    where: { name: 'Torque Wrench' },
    update: {},
    create: { name: 'Torque Wrench', category: 'Torque' },
  });

  const warehouse = await prisma.warehouse.findFirst({ where: { code: 'GEG' } });
  if (!warehouse) {
    throw new Error('Missing seed warehouse');
  }

  await prisma.tool.upsert({
    where: { toolNumber: 'TL-1001' },
    update: {},
    create: {
      toolNumber: 'TL-1001',
      serialNumber: 'SN-0001',
      status: ToolStatus.SERVICEABLE,
      warehouseId: warehouse.id,
      toolTypeId: torqueType.id,
      calibration: {
        create: {
          dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
      },
    },
  });

  await prisma.tool.upsert({
    where: { toolNumber: 'TL-1002' },
    update: {},
    create: {
      toolNumber: 'TL-1002',
      serialNumber: 'SN-0002',
      status: ToolStatus.QUARANTINED,
      warehouseId: warehouse.id,
      toolTypeId: torqueType.id,
      calibration: {
        create: {
          dueAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      },
      quarantine: {
        create: {
          reason: 'Damaged handle',
        },
      },
    },
  });

  await prisma.historyEvent.create({
    data: {
      tool: { connect: { toolNumber: 'TL-1001' } },
      type: 'SEED',
      payload: JSON.stringify({ message: 'Seed data created' }),
      hashPrev: null,
      hashThis: 'seed',
    },
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
