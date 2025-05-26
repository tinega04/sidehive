import { BusinessIdeaSuggestion, NicheGPTResponse } from '../types/types';
import { businessIdeas } from '../data/businessIdeas';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function handleNicheGPTRequest(message: string): Promise<NicheGPTResponse> {
  try {
    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are NicheGPT, an AI business advisor specializing in Kenyan side hustles and business opportunities. 
            Your goal is to help users discover business ideas that match their interests, capital, and circumstances.
            You have access to a curated database of business ideas with details about capital requirements, ROI, and startup steps.
            Always provide structured, actionable advice and relevant business suggestions from the available data.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Filter and match business ideas based on the context
    // This is a simple example - you would want to implement more sophisticated matching
    const suggestions = businessIdeas
      .filter(idea => {
        // Add your filtering logic here based on the user's message and AI response
        return true;
      })
      .slice(0, 3) // Limit to 3 suggestions
      .map(idea => ({
        title: idea.title,
        capitalRequired: idea.capitalRequired,
        estimatedROI: idea.estimatedROI,
        toolsAndSkills: idea.toolsAndSkills,
        startupSteps: idea.startupSteps,
        industry: idea.industry,
        capitalTier: idea.capitalTier,
      }));

    return {
      message: aiResponse,
      suggestions,
      followUpQuestions: [
        "Would you like more details about any of these ideas?",
        "Shall we explore ideas in a different industry?",
        "Would you like to know about the startup costs and requirements?"
      ]
    };
  } catch (error) {
    console.error('Error in NicheGPT:', error);
    throw new Error('Failed to process your request. Please try again.');
  }
} 