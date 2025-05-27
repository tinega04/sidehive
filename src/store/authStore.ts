import create from 'zustand';
import { AuthState, User } from '../types/types';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, auto-login with a mock user
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
    };
    
    set({ isAuthenticated: true, user: mockUser });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
})); 