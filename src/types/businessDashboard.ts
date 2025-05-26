export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface BusinessOverview {
  title: string;
  slug: string;
  description: string;
  capitalRange: {
    min: number;
    max: number;
  };
  idealCustomer: {
    demographics: string[];
    location: string[];
    interests: string[];
  };
  riskLevel: RiskLevel;
  timeToBreakEven: number; // in months
  monthlyProfitRange: {
    min: number;
    max: number;
  };
}

export interface StartupCost {
  id: string;
  category: string;
  item: string;
  amount: number;
  isRequired: boolean;
}

export interface BusinessPlan {
  introduction: string;
  marketNeed: string;
  targetCustomer: string;
  startupCosts: StartupCost[];
  revenueStreams: string[];
  operations: {
    daily: string[];
    monthly: string[];
  };
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  location: string;
  items: string[];
}

export interface SalesEntry {
  id: string;
  date: string;
  item: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ExpenseEntry {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reorderPoint?: number;
}

export interface MonthlySnapshot {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface MarketingTip {
  id: string;
  platform: string;
  title: string;
  description: string;
  steps: string[];
  estimatedCost: number;
  estimatedTimeInHours: number;
}

export interface BusinessDashboard {
  overview: BusinessOverview;
  startupToolkit: {
    businessPlan: BusinessPlan;
    suppliers: Supplier[];
  };
  tracking: {
    sales: SalesEntry[];
    expenses: ExpenseEntry[];
    inventory: InventoryItem[];
  };
  growth: {
    monthlySnapshots: MonthlySnapshot[];
    marketingTips: MarketingTip[];
  };
} 