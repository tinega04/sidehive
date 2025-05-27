export enum Industry {
  RETAIL = 'Retail',
  MANUFACTURING = 'Manufacturing',
  SERVICES = 'Services',
  FOOD = 'Food & Beverage',
  TECH = 'Technology',
  AGRICULTURE = 'Agriculture',
}

export type CapitalTier = 'low' | 'medium' | 'high' | 'all';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface MoneyRange {
  min: number;
  max: number;
}

export interface BusinessIdea {
  id: string;
  title: string;
  description: string;
  industry: Industry;
  startupCapital: MoneyRange;
  monthlyProfit: MoneyRange;
  tags: string[];
  popularity: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface StoreState {
  industry: Industry | 'all';
  capitalTier: CapitalTier;
  setIndustry: (industry: Industry | 'all') => void;
  setCapitalTier: (tier: CapitalTier) => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface NicheGPTState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export interface BusinessIdeaSuggestion extends Omit<BusinessIdea, 'id' | 'description'> {}

export interface NicheGPTResponse {
  message: string;
  suggestions?: BusinessIdeaSuggestion[];
  followUpQuestions?: string[];
} 