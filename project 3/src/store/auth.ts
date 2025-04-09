import { create } from 'zustand';
import { User, LoginCredentials, RegisterData } from '@/types';
import api from '@/lib/api';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  login: async (credentials) => {
    set({ loading: true });
    try {
      const { data } = await api.post('/auth/login', credentials);
      localStorage.setItem('token', data.token);
      set({ user: data.user });
    } finally {
      set({ loading: false });
    }
  },
  register: async (data) => {
    set({ loading: true });
    try {
      const response = await api.post('/auth/register', data);
      localStorage.setItem('token', response.data.token);
      set({ user: response.data.user });
    } finally {
      set({ loading: false });
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
}));