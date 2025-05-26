import OpenAI from 'openai';
import { config } from '../config';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 30000,
});

// Rate limiting parameters
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 50;
const requestTimestamps: number[] = [];

// Rate limit checker
const checkRateLimit = () => {
  const now = Date.now();
  // Remove timestamps older than the window
  while (requestTimestamps.length && requestTimestamps[0] < now - RATE_LIMIT_WINDOW) {
    requestTimestamps.shift();
  }
  
  if (requestTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  requestTimestamps.push(now);
};

export interface NicheGPTRequest {
  prompt: string;
  industry?: string;
  marketSize?: string;
  capitalRange?: string;
}

export interface NicheGPTResponse {
  businessIdea: string;
  analysis: string;
  requirements: string[];
  estimatedCosts: {
    startup: number;
    monthly: number;
  };
}

export const generateBusinessIdea = async (params: NicheGPTRequest): Promise<NicheGPTResponse> => {
  try {
    checkRateLimit();

    const systemPrompt = `You are NicheGPT, an expert in generating Kenyan business ideas. 
    Consider the following parameters for a business idea:
    - Industry: ${params.industry || 'any'}
    - Market Size: ${params.marketSize || 'medium'}
    - Capital Range: ${params.capitalRange || '100,000 - 500,000 KSH'}
    
    Provide a detailed, practical business idea suitable for the Kenyan market.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: params.prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const completion = response.choices[0]?.message?.content;
    if (!completion) {
      throw new Error('No completion generated');
    }

    // Parse the completion into structured data
    // This is a simplified version - you might want to add more structure to the prompt
    // to get more structured responses
    return {
      businessIdea: completion.split('\n')[0],
      analysis: completion,
      requirements: ['Business Registration', 'Location', 'Permits'],
      estimatedCosts: {
        startup: 250000, // Default 250,000 KSH
        monthly: 50000,  // Default 50,000 KSH
      }
    };

  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error('OpenAI rate limit reached. Please try again later.');
    }
    
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate business idea. Please try again later.');
  }
}; 