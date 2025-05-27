export interface Business {
  slug: string;
  title: string;
  description: string;
  startupCapital: {
    min: number;
    max: number;
  };
  idealCustomer: {
    demographics: string[];
    location: string[];
    interests: string[];
  };
  riskLevel: 'Low' | 'Medium' | 'High';
  timeToBreakEven: number; // in months
  monthlyProfit: {
    min: number;
    max: number;
  };
  startupCosts: {
    id: string;
    item: string;
    amount: number;
  }[];
  businessPlan: {
    introduction: string;
    marketNeed: string;
    targetCustomer: string;
    startupCostBreakdown: string;
    revenueStreams: string;
    operations: string;
  };
  suppliers: {
    id: string;
    name: string;
    contact: string;
    location: string;
    items: string[];
  }[];
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
  alertThreshold?: number;
}

export interface MonthlySnapshot {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
} 