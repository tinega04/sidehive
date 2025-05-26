import React from 'react';
import { useStore } from '../store/store';
import { CapitalTier } from '../types/types';

const Filters: React.FC = () => {
  const { capitalTier, setCapitalTier } = useStore();

  const capitalTierDetails = {
    [CapitalTier.Low]: {
      icon: '💰',
      description: 'Perfect for starting with minimal savings'
    },
    [CapitalTier.Medium]: {
      icon: '💰💰',
      description: 'Good for those with some capital saved'
    },
    [CapitalTier.High]: {
      icon: '💰💰💰',
      description: 'For serious entrepreneurs with significant investment'
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter by Starting Capital</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(CapitalTier).map((tier) => (
          <button
            key={tier}
            onClick={() => setCapitalTier(tier)}
            className={`p-4 rounded-lg text-left transition-all ${
              capitalTier === tier
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-900 hover:bg-indigo-50'
            }`}
          >
            <div className="text-2xl mb-2">{capitalTierDetails[tier].icon}</div>
            <div className="font-medium mb-1">{tier}</div>
            <div className={`text-sm ${
              capitalTier === tier ? 'text-indigo-100' : 'text-gray-500'
            }`}>
              {capitalTierDetails[tier].description}
            </div>
          </button>
        ))}
      </div>
      {capitalTier !== 'all' && (
        <button
          onClick={() => setCapitalTier('all')}
          className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          Clear filter
        </button>
      )}
    </div>
  );
};

export default Filters; 