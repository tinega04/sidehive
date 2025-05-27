import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserPreferences {
  preferredIndustries: string[];
  capitalRange: {
    min: number;
    max: number;
  };
  interestedTags: string[];
  notificationSettings: {
    email: boolean;
    push: boolean;
  };
  theme: 'light' | 'dark';
  language: 'en' | 'sw'; // English and Swahili support
}

interface PreferencesStore {
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  preferredIndustries: [],
  capitalRange: {
    min: 0,
    max: 100000,
  },
  interestedTags: [],
  notificationSettings: {
    email: true,
    push: false,
  },
  theme: 'light',
  language: 'en',
};

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
      resetPreferences: () => set({ preferences: defaultPreferences }),
    }),
    {
      name: 'preferences-store',
    }
  )
); 