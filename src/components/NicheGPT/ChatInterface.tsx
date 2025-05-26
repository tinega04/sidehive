import React, { useState, useRef, useEffect } from 'react';
import { useNicheGPTStore } from '../../store/nicheGPTStore';
import { BusinessIdeaSuggestion, ChatMessage } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3001/api/niche-gpt';

interface ExtendedChatMessage extends Omit<ChatMessage, 'timestamp'> {
  timestamp: Date;
  suggestions?: BusinessIdeaSuggestion[];
  followUpQuestions?: string[];
}

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, error, addMessage, setLoading, setError } = useNicheGPTStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    addMessage(input, 'user');
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      addMessage(data.message, 'assistant');

      // If there are suggestions, add them to the message
      if (data.suggestions?.length > 0) {
        const suggestionsMessage = {
          id: uuidv4(),
          role: 'assistant' as const,
          content: '',
          timestamp: new Date(),
          suggestions: data.suggestions,
        };
        addMessage(suggestionsMessage.content, suggestionsMessage.role, suggestionsMessage);
      }

      // If there are follow-up questions, add them
      if (data.followUpQuestions?.length > 0) {
        const questionsMessage = {
          id: uuidv4(),
          role: 'assistant' as const,
          content: 'Here are some follow-up questions:',
          timestamp: new Date(),
          followUpQuestions: data.followUpQuestions,
        };
        addMessage(questionsMessage.content, questionsMessage.role, questionsMessage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const renderMessage = (message: ExtendedChatMessage) => {
    const isAssistant = message.role === 'assistant';
    return (
      <div
        key={message.id}
        className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}
      >
        <div
          className={`max-w-[80%] rounded-lg p-4 ${
            isAssistant
              ? 'bg-white border border-gray-200'
              : 'bg-indigo-600 text-white'
          }`}
        >
          {message.content && (
            <p className="text-sm">{message.content}</p>
          )}
          
          {message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-4 space-y-4">
              {message.suggestions.map((suggestion) => (
                <div
                  key={suggestion.title}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                >
                  <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Capital: KES {suggestion.capitalRequired.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">ROI: {suggestion.estimatedROI}</p>
                  {suggestion.toolsAndSkills && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-gray-500">Tools & Skills:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {suggestion.toolsAndSkills.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {message.followUpQuestions && message.followUpQuestions.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">Follow-up questions:</p>
              {message.followUpQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded px-2 py-1 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">NicheGPT</h2>
        <p className="text-sm text-gray-500">Your AI business advisor</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {(messages as ExtendedChatMessage[]).map(renderMessage)}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about business ideas..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface; 