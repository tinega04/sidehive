import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Business {
  id: string;
  title: string;
  description: string;
  capitalRequired: {
    min: number;
    max: number;
  };
  monthlyProfit: {
    min: number;
    max: number;
  };
  industry: string;
  tags: string[];
  setupSteps: string[];
  pros: string[];
  cons: string[];
}

interface SavedHustle extends Business {
  notes: string;
  progress: 'planning' | 'started' | 'launched';
  checklist: {
    id: string;
    task: string;
    completed: boolean;
  }[];
}

interface BusinessStore {
  viewedBusinesses: string[];
  savedHustles: SavedHustle[];
  addViewedBusiness: (businessId: string) => void;
  saveHustle: (business: Business) => void;
  removeSavedHustle: (businessId: string) => void;
  updateHustleNotes: (businessId: string, notes: string) => void;
  updateHustleProgress: (businessId: string, progress: SavedHustle['progress']) => void;
  updateHustleChecklist: (businessId: string, checklistId: string, completed: boolean) => void;
}

export const useBusinessStore = create<BusinessStore>()(
  persist(
    (set) => ({
      viewedBusinesses: [],
      savedHustles: [],

      addViewedBusiness: (businessId) =>
        set((state) => ({
          viewedBusinesses: [businessId, ...state.viewedBusinesses].slice(0, 50),
        })),

      saveHustle: (business) =>
        set((state) => {
          if (state.savedHustles.some((h) => h.id === business.id)) return state;
          const newHustle: SavedHustle = {
            ...business,
            notes: '',
            progress: 'planning',
            checklist: business.setupSteps.map((task, index) => ({
              id: `${business.id}-${index}`,
              task,
              completed: false,
            })),
          };
          return { savedHustles: [...state.savedHustles, newHustle] };
        }),

      removeSavedHustle: (businessId) =>
        set((state) => ({
          savedHustles: state.savedHustles.filter((h) => h.id !== businessId),
        })),

      updateHustleNotes: (businessId, notes) =>
        set((state) => ({
          savedHustles: state.savedHustles.map((h) =>
            h.id === businessId ? { ...h, notes } : h
          ),
        })),

      updateHustleProgress: (businessId, progress) =>
        set((state) => ({
          savedHustles: state.savedHustles.map((h) =>
            h.id === businessId ? { ...h, progress } : h
          ),
        })),

      updateHustleChecklist: (businessId, checklistId, completed) =>
        set((state) => ({
          savedHustles: state.savedHustles.map((h) =>
            h.id === businessId
              ? {
                  ...h,
                  checklist: h.checklist.map((item) =>
                    item.id === checklistId ? { ...item, completed } : item
                  ),
                }
              : h
          ),
        })),
    }),
    {
      name: 'business-store',
    }
  )
); 