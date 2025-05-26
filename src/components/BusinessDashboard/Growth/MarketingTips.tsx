import React, { useState } from 'react';
import { MarketingTip } from '../../../types/businessDashboard';

interface MarketingTipsProps {
  tips: MarketingTip[];
}

const PLATFORM_COLORS = {
  WhatsApp: 'green',
  Facebook: 'blue',
  Instagram: 'pink',
  TikTok: 'purple',
  'Local Marketing': 'indigo',
  Other: 'gray',
} as const;

type Platform = keyof typeof PLATFORM_COLORS;

const MarketingTips: React.FC<MarketingTipsProps> = ({ tips }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'All'>('All');

  const platforms = Array.from(new Set(tips.map((tip) => tip.platform))) as Platform[];
  const filteredTips = selectedPlatform === 'All'
    ? tips
    : tips.filter((tip) => tip.platform === selectedPlatform);

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const getPlatformColor = (platform: string): string => {
    return PLATFORM_COLORS[platform as Platform] || PLATFORM_COLORS.Other;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Marketing Tips</h2>
        <div className="mt-4 md:mt-0">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as Platform | 'All')}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="All">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`bg-${getPlatformColor(tip.platform)}-50 px-4 py-3 border-b border-gray-200`}>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getPlatformColor(tip.platform)}-100 text-${getPlatformColor(tip.platform)}-800`}>
                  {tip.platform}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">
                    {tip.estimatedTimeInHours} {tip.estimatedTimeInHours === 1 ? 'hour' : 'hours'}
                  </span>
                  <span>{formatCurrency(tip.estimatedCost)}</span>
                </div>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">{tip.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{tip.description}</p>
            </div>
            <div className="px-4 py-3">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Steps to Implement:</h4>
              <ol className="space-y-2">
                {tip.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-${getPlatformColor(tip.platform)}-100 text-${getPlatformColor(tip.platform)}-600 text-sm font-medium mr-3`}>
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No marketing tips found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try selecting a different platform or check back later for new tips.
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketingTips; 