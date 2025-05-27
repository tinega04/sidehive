import React, { useState } from 'react';
import {
  CalculatorIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ForwardRefExoticComponent<any>;
  category: 'startup' | 'growth' | 'operational';
}

const tools: Tool[] = [
  {
    id: 'budget-planner',
    name: 'Budget Planner',
    description: 'Plan your startup costs and monthly expenses',
    icon: CalculatorIcon,
    category: 'startup',
  },
  {
    id: 'checklist-creator',
    name: 'Business Checklist Creator',
    description: 'Create custom checklists for your business setup',
    icon: ClipboardDocumentListIcon,
    category: 'startup',
  },
  {
    id: 'sales-tracker',
    name: 'Sales Tracker',
    description: 'Track your daily, weekly, and monthly sales',
    icon: ChartBarIcon,
    category: 'growth',
  },
  {
    id: 'profit-estimator',
    name: 'Profit Estimator',
    description: 'Calculate potential profits based on costs and revenue',
    icon: CurrencyDollarIcon,
    category: 'growth',
  },
  {
    id: 'inventory-log',
    name: 'Inventory Log',
    description: 'Keep track of your stock and supplies',
    icon: ClipboardDocumentCheckIcon,
    category: 'operational',
  },
  {
    id: 'cashflow-tracker',
    name: 'Cashflow Tracker',
    description: 'Monitor your income and expenses',
    icon: ArrowTrendingUpIcon,
    category: 'operational',
  },
];

const Tools: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Tool['category']>('startup');

  const categories = {
    startup: 'Startup Tools',
    growth: 'Growth Tools',
    operational: 'Operational Tools',
  };

  const filteredTools = tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Business Tools</h1>
        <p className="mt-2 text-gray-600">
          Essential tools to help you start and grow your business
        </p>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as Tool['category'])}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${selectedCategory === key
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <div
            key={tool.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 rounded-lg p-3">
                <tool.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900">{tool.name}</h3>
            </div>
            <p className="text-gray-600">{tool.description}</p>
            <button
              className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Open Tool
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        ))}
      </div>

      {/* Coming Soon Banner */}
      <div className="mt-12 bg-indigo-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-indigo-900">More Tools Coming Soon!</h2>
            <p className="mt-1 text-indigo-700">
              We're working on additional tools to help you succeed in your business journey.
            </p>
          </div>
          <span className="text-3xl">🚀</span>
        </div>
      </div>
    </div>
  );
};

export default Tools; 