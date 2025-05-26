import React from 'react';
import { BusinessIdea } from '../types/types';

interface BusinessCardProps {
  idea: BusinessIdea;
  onViewDetails: (idea: BusinessIdea) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ idea, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{idea.title}</h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {idea.capitalRequired}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-2">{idea.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-32">Startup Cost:</span>
            <span className="text-gray-900 font-medium">{idea.estimatedStartupCost}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-32">Monthly Income:</span>
            <span className="text-gray-900 font-medium">{idea.monthlyIncomeRange}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 w-32">Time Required:</span>
            <span className="text-gray-900 font-medium">{idea.timeCommitment}</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="text-sm font-medium text-gray-900">Key Requirements:</div>
          <div className="flex flex-wrap gap-2">
            {idea.toolsNeeded.slice(0, 3).map((tool, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tool}
              </span>
            ))}
            {idea.toolsNeeded.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{idea.toolsNeeded.length - 3} more
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onViewDetails(idea)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
        >
          View Full Details
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BusinessCard; 