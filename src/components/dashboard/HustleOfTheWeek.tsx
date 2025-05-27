import React from 'react';
import { StarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const HustleOfTheWeek = () => {
  const featuredHustle = {
    id: 'liquid-soap',
    title: 'Liquid Soap Refilling Station',
    description: 'Start a profitable eco-friendly business with minimal capital by setting up a liquid soap refilling station.',
    capitalRequired: 25000,
    profitPotential: 'High',
    startupTime: 'Quick',
    tags: ['eco-friendly', 'low-capital', 'high-demand'],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <StarIcon className="w-6 h-6 text-yellow-500 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">Hustle of the Week</h3>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-2">{featuredHustle.title}</h4>
        <p className="text-gray-600 mb-4">{featuredHustle.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Capital Required</p>
            <p className="font-semibold">KES {featuredHustle.capitalRequired.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Profit Potential</p>
            <p className="font-semibold">{featuredHustle.profitPotential}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {featuredHustle.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-white rounded-full text-sm text-blue-600">
              #{tag}
            </span>
          ))}
        </div>

        <Link 
          to={`/business/${featuredHustle.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          Learn More
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default HustleOfTheWeek; 