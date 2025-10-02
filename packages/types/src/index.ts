export interface Tool {
  id: string;
  toolNumber: string;
  serialNumber: string;
  status: 'SERVICEABLE' | 'OUT_OF_SERVICE' | 'QUARANTINED' | 'IN_TRANSIT' | 'CHECKED_OUT';
  warehouseId: string;
  zoneId?: string | null;
  shelfId?: string | null;
  calibrationDue?: string | null;
}

export interface CheckoutEvent {
  id: string;
  toolId: string;
  userId: string;
  status: 'ISSUED' | 'RETURNED' | 'OVERRIDDEN';
  createdAt: string;
  reason?: string;
}

export interface CapabilityFlag {
  name: string;
  description: string;
}

export type RoleName = 'admin' | 'manager' | 'user';
