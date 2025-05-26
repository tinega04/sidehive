import { create } from 'zustand';
import { ChatMessage, NicheGPTState, BusinessIdeaSuggestion } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

interface ExtendedChatMessage extends ChatMessage {
  suggestions?: BusinessIdeaSuggestion[];
  followUpQuestions?: string[];
}

interface NicheGPTStore extends NicheGPTState {
  addMessage: (content: string, role: 'user' | 'assistant', additionalData?: Partial<ExtendedChatMessage>) => void;
  clearMessages: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNicheGPTStore = create<NicheGPTStore>((set) => ({
  messages: [],
  isLoading: false,
  error: null,

  addMessage: (content, role, additionalData = {}) => {
    const newMessage: ExtendedChatMessage = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date(),
      ...additionalData,
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  clearMessages: () => set({ messages: [] }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
})); 