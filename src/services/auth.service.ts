import { http } from '@/api/http-client';
import type { AuthResponse } from '@/types/auth';

export class AuthService {
  async login(username: string, password: string): Promise<AuthResponse> {
    return http<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }
  
  async me(): Promise<AuthResponse> {
    return http<AuthResponse>('/auth/me');
  }
}