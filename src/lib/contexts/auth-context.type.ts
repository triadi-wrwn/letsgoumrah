import { Profile } from '@/lib/types/auth-response.type';
import { ReactNode } from 'react';

export interface AuthContextTypes {
  isAuthenticated: boolean;
  currentUser: Profile | undefined;
  getProfile: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
