import React, { useState } from 'react';
import { useStore, getFilteredBusinessIdeas } from '../store/store';
import { Industry, CapitalTier, BusinessIdea } from '../types/types';

interface FilterState {
  setupTime: string;
  profitability: string;
  skillLevel: string;
}

const BrowseIdeas: React.FC = () => {
  const { industry, setIndustry, capitalTier, setCapitalTier } = useStore();
  const [filters, setFilters] = useState<FilterState>({
    setupTime: 'all',
    profitability: 'all',
    skillLevel: 'all',
  });
  const [sortBy, setSortBy] = useState<string>('popular');

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const ideas = getFilteredBusinessIdeas(industry, capitalTier);

  // Sort ideas based on selected criteria
  const sortedIdeas = [...ideas].sort((a, b) => {
    switch (sortBy) {
      case 'lowCapital':
        return a.startupCapital.min - b.startupCapital.min;
      case 'highProfit':
        return b.monthlyProfit.max - a.monthlyProfit.max;
      default: // 'popular'
        return b.popularity - a.popularity;
    }
  });

  return (
    <div className="flex">
      {/* Filter Sidebar */}
      <div className="w-64 bg-white shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          
          {/* Industry Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as Industry)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="all">All Industries</option>
              {Object.values(Industry).map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Capital Range Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capital Range
            </label>
            <select
              value={capitalTier}
              onChange={(e) => setCapitalTier(e.target.value as CapitalTier)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="all">All Ranges</option>
              <option value="low">0 - 10,000 KES</option>
              <option value="medium">10,000 - 50,000 KES</option>
              <option value="high">50,000+ KES</option>
            </select>
          </div>

          {/* Setup Time Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Setup Time
            </label>
            <select
              value={filters.setupTime}
              onChange={(e) => handleFilterChange('setupTime', e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="all">Any Time</option>
              <option value="quick">Quick (1-3 days)</option>
              <option value="medium">Medium (1-2 weeks)</option>
              <option value="long">Long (2+ weeks)</option>
            </select>
          </div>

          {/* Skill Level Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Level
            </label>
            <select
              value={filters.skillLevel}
              onChange={(e) => handleFilterChange('skillLevel', e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="all">Any Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Browse Ideas</h1>
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="popular">Most Popular</option>
              <option value="lowCapital">Lowest Capital</option>
              <option value="highProfit">Highest Profit</option>
            </select>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedIdeas.map((idea: BusinessIdea) => (
            <div key={idea.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {idea.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {idea.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Startup Capital</span>
                    <span className="font-medium">
                      KES {idea.startupCapital.min.toLocaleString()} - {idea.startupCapital.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Monthly Profit</span>
                    <span className="font-medium text-green-600">
                      KES {idea.monthlyProfit.min.toLocaleString()} - {idea.monthlyProfit.max.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  {idea.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                    Learn More
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseIdeas; 