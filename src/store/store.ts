import create from 'zustand';
import { Industry, CapitalTier, StoreState, BusinessIdea } from '../types/types';
import { liquidSoapBusiness } from '../data/businesses/liquid-soap-refilling';

// Sample business ideas data
const businessIdeas: BusinessIdea[] = [
  liquidSoapBusiness,
  {
    id: '2',
    title: 'Baby Clothes Reseller',
    description: 'Start a baby clothes reselling business with minimal investment',
    industry: Industry.RETAIL,
    startupCapital: { min: 10000, max: 30000 },
    monthlyProfit: { min: 15000, max: 45000 },
    tags: ['Low Risk', 'High Demand', 'Retail'],
    popularity: 85,
  },
  {
    id: '3',
    title: 'Mobile Food Cart',
    description: 'Operate a mobile food cart serving local delicacies',
    industry: Industry.FOOD,
    startupCapital: { min: 25000, max: 50000 },
    monthlyProfit: { min: 30000, max: 60000 },
    tags: ['Food', 'Mobile', 'Cash Flow'],
    popularity: 92,
  },
];

export const useStore = create<StoreState>((set) => ({
  industry: 'all',
  capitalTier: 'all',
  setIndustry: (industry) => set({ industry }),
  setCapitalTier: (capitalTier) => set({ capitalTier }),
}));

export const getFilteredBusinessIdeas = (
  industry: Industry | 'all',
  capitalTier: CapitalTier
): BusinessIdea[] => {
  let filtered = [...businessIdeas];

  // Filter by industry
  if (industry !== 'all') {
    filtered = filtered.filter((idea) => idea.industry === industry);
  }

  // Filter by capital tier
  if (capitalTier !== 'all') {
    filtered = filtered.filter((idea) => {
      const avgCapital = (idea.startupCapital.min + idea.startupCapital.max) / 2;
      switch (capitalTier) {
        case 'low':
          return avgCapital <= 10000;
        case 'medium':
          return avgCapital > 10000 && avgCapital <= 50000;
        case 'high':
          return avgCapital > 50000;
        default:
          return true;
      }
    });
  }

  return filtered;
}; 