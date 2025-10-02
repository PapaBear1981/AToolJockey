import { Injectable } from '@nestjs/common';

export interface AuthenticatedUser {
  id: string;
  roles: string[];
  capabilities: string[];
}

@Injectable()
export class AuthService {
  async validateToken(token?: string): Promise<AuthenticatedUser | null> {
    if (!token) {
      return null;
    }
    if (token === 'dev-admin-token') {
      return { id: '00000000-0000-0000-0000-000000000001', roles: ['admin'], capabilities: ['checkout.override', 'transfers.approve'] };
    }
    if (token === 'dev-manager-token') {
      return { id: '00000000-0000-0000-0000-000000000002', roles: ['manager'], capabilities: ['checkout.override'] };
    }
    if (token === 'dev-user-token') {
      return { id: '00000000-0000-0000-0000-000000000003', roles: ['user'], capabilities: [] };
    }
    return null;
  }
}
