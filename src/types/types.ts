export enum Industry {
  Retail = 'Retail',
  FoodAndBeverage = 'Food & Beverage',
  Services = 'Services',
  FashionAndBeauty = 'Fashion & Beauty',
  DigitalAndOnline = 'Digital/Online',
  HomeAndLiving = 'Home & Living',
  EventsAndGifting = 'Events & Gifting',
}

export enum CapitalTier {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface BusinessIdea {
  id: string;
  title: string;
  description: string;
  industry: Industry;
  capitalRequired: number;
  estimatedROI: string;
  toolsAndSkills: string[];
  startupSteps: string[];
  capitalTier: CapitalTier;
  localResources?: string[];
}

export interface StoreState {
  industry: Industry | 'all';
  capitalTier: CapitalTier | 'all';
  setIndustry: (industry: Industry | 'all') => void;
  setCapitalTier: (capitalTier: CapitalTier | 'all') => void;
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