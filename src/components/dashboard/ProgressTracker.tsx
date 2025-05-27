import React from 'react';
import { ChartBarIcon, BookmarkIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface ActivityMetric {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

export const ProgressTracker = () => {
  const metrics: ActivityMetric[] = [
    {
      label: 'Ideas Explored',
      value: 12,
      icon: ChartBarIcon,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Saved Hustles',
      value: 3,
      icon: BookmarkIcon,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Tools Used',
      value: 5,
      icon: WrenchScrewdriverIcon,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center p-4 rounded-lg bg-gray-50">
            <div className={`p-3 rounded-full ${metric.color}`}>
              <metric.icon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-gray-600">{metric.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker; 