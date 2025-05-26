import { create } from 'zustand';
import { Industry, CapitalTier, StoreState, BusinessIdea } from '../types/types';
import { businessIdeas } from '../data/businessIdeas';

export const useStore = create<StoreState>((set) => ({
  industry: 'all',
  capitalTier: 'all',
  setIndustry: (industry) => set({ industry }),
  setCapitalTier: (capitalTier) => set({ capitalTier }),
}));

export const getFilteredBusinessIdeas = (
  industry: Industry | 'all',
  capitalTier: CapitalTier | 'all'
): BusinessIdea[] => {
  return businessIdeas.filter((idea) => {
    const matchesIndustry = industry === 'all' || idea.industry === industry;
    const matchesCapital = capitalTier === 'all' || idea.capitalRequired === capitalTier;
    return matchesIndustry && matchesCapital;
  });
}; 