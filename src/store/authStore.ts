import { create } from 'zustand';
import { AuthState, LoginCredentials, User } from '../types/auth';

// Temporary user credentials for testing
const TEMP_USER = {
  email: 'stephentinega04@gmail.com',
  password: '12345678',
};

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (credentials: LoginCredentials) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check against temporary credentials
    if (credentials.email === TEMP_USER.email && credentials.password === TEMP_USER.password) {
      const user: User = {
        email: credentials.email,
        id: '1', // Temporary ID
      };
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
})); 