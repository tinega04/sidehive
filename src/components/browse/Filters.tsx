import React from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface FiltersProps {
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  selectedCapital: string;
  setSelectedCapital: (capital: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const industries = [
  'All',
  'Retail',
  'Food & Beverage',
  'Services',
  'Digital',
  'Manufacturing',
  'Agriculture',
];

const capitalRanges = [
  'All',
  '0-10K',
  '10K-50K',
  '50K-100K',
  '100K+',
];

const tags = [
  'All',
  'quick-start',
  'high-profit',
  'low-risk',
  'trending',
  'eco-friendly',
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'capital-asc', label: 'Capital: Low to High' },
  { value: 'capital-desc', label: 'Capital: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

export const Filters: React.FC<FiltersProps> = ({
  selectedIndustry,
  setSelectedIndustry,
  selectedCapital,
  setSelectedCapital,
  selectedTag,
  setSelectedTag,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <FunnelIcon className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Industry Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Capital Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capital Required
          </label>
          <select
            value={selectedCapital}
            onChange={(e) => setSelectedCapital(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {capitalRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters; 