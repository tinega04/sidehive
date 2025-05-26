import React from 'react';
import { Industry } from '../types/types';

interface CategoryCardProps {
  category: Industry;
  onSelect: () => void;
}

const getCategoryIcon = (category: Industry): string => {
  switch (category) {
    case Industry.Agriculture:
      return '🌾';
    case Industry.Food:
      return '🍽️';
    case Industry.Tech:
      return '💻';
    case Industry.Retail:
      return '🛍️';
    case Industry.Services:
      return '🛠️';
    case Industry.Fashion:
      return '👗';
    case Industry.Manufacturing:
      return '🏭';
    default:
      return '💼';
  }
};

const getCategoryDescription = (category: Industry): string => {
  switch (category) {
    case Industry.Agriculture:
      return 'Start farming, livestock, or agribusiness ventures with various capital levels.';
    case Industry.Food:
      return 'Explore food service and beverage businesses from small to large scale.';
    case Industry.Tech:
      return 'Launch digital and tech-based businesses with minimal startup costs.';
    case Industry.Retail:
      return 'Start trading businesses from small kiosks to larger retail stores.';
    case Industry.Services:
      return 'Offer various services to individuals and businesses.';
    case Industry.Fashion:
      return 'Enter the fashion and beauty industry with different investment levels.';
    case Industry.Manufacturing:
      return 'Start small-scale manufacturing and skilled trade businesses.';
    default:
      return 'Explore business opportunities in this sector.';
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="text-4xl mb-4">{getCategoryIcon(category)}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{category}</h3>
        <p className="text-gray-600 mb-4">{getCategoryDescription(category)}</p>
        <div className="flex items-center text-indigo-600 font-medium">
          Explore Ideas
          <svg
            className="w-5 h-5 ml-2"
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
        </div>
      </div>
    </div>
  );
};

export default CategoryCard; 