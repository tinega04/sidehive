import React, { useState } from 'react';
import { usePreferencesStore } from '../../store/preferencesStore';

export const NicheGPT = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { preferences } = usePreferencesStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Placeholder for future NicheGPT API integration
    console.log('NicheGPT prompt:', {
      prompt,
      preferences,
    });
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">NicheGPT Assistant</h2>
        <p className="text-gray-600">
          Get personalized business insights and recommendations powered by AI.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ask NicheGPT
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., What are the trending business opportunities in my preferred industries?"
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isLoading || !prompt.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Processing...' : 'Get Insights'}
          </button>
          {isLoading && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Sample Prompts</h3>
        <div className="space-y-2">
          {[
            'What are the key success factors for my selected industry?',
            'How can I minimize startup costs in my business?',
            'What are the common challenges in my industry and how to overcome them?',
            'Suggest marketing strategies for my target market.',
          ].map((samplePrompt, index) => (
            <button
              key={index}
              onClick={() => setPrompt(samplePrompt)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              {samplePrompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NicheGPT; 