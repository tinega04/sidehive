import React from 'react';
import { Link } from 'react-router-dom';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { Business } from '../../store/businessStore';

interface BusinessCardProps {
  business: Business;
  isSaved: boolean;
  onSave: () => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  isSaved,
  onSave,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {business.title}
          </h3>
          <button
            onClick={onSave}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            {isSaved ? (
              <BookmarkSolid className="w-6 h-6 text-blue-500" />
            ) : (
              <BookmarkOutline className="w-6 h-6" />
            )}
          </button>
        </div>

        <p className="text-gray-600 mb-4">{business.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Capital Required</p>
            <p className="font-semibold">
              KES {business.capitalRequired.min.toLocaleString()} -{' '}
              {business.capitalRequired.max.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Profit</p>
            <p className="font-semibold text-green-600">
              KES {business.monthlyProfit.min.toLocaleString()} -{' '}
              {business.monthlyProfit.max.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {business.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          to={`/business/${business.id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default BusinessCard; 