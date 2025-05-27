import React from 'react';
import { useParams } from 'react-router-dom';
import { useBusinessStore } from '../../store/businessStore';
import {
  BookmarkIcon as BookmarkOutline,
  BookmarkIcon as BookmarkSolid,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { liquidSoapBusiness } from '../../data/businesses/liquid-soap-refilling';

export const BusinessDashboard = () => {
  const { slug } = useParams<{ slug: string }>();
  const { savedHustles, saveHustle, removeSavedHustle } = useBusinessStore();

  // In a real app, fetch business data based on slug
  const business = liquidSoapBusiness;
  const isSaved = savedHustles.some((h) => h.id === business.id);

  const handleSaveToggle = () => {
    if (isSaved) {
      removeSavedHustle(business.id);
    } else {
      saveHustle(business);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {business.title}
                </h1>
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
                <p className="text-gray-600">{business.description}</p>
              </div>
              <button
                onClick={handleSaveToggle}
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                {isSaved ? (
                  <BookmarkSolid className="w-8 h-8 text-blue-500" />
                ) : (
                  <BookmarkOutline className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Financial Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <BanknotesIcon className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-medium text-green-900">Capital Required</h3>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  KES {business.capitalRequired.min.toLocaleString()} -{' '}
                  {business.capitalRequired.max.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <ChartBarIcon className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-blue-900">Monthly Profit</h3>
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  KES {business.monthlyProfit.min.toLocaleString()} -{' '}
                  {business.monthlyProfit.max.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pros & Cons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="flex items-center text-green-700 font-medium mb-3">
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Advantages
                </h3>
                <ul className="space-y-2">
                  {business.pros.map((pro, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-600 bg-green-50 p-2 rounded"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center text-red-700 font-medium mb-3">
                  <XCircleIcon className="w-5 h-5 mr-2" />
                  Challenges
                </h3>
                <ul className="space-y-2">
                  {business.cons.map((con, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-600 bg-red-50 p-2 rounded"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Setup Steps */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Setup Guide
            </h2>
            <div className="space-y-4">
              {business.setupSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-600">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleSaveToggle}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                {isSaved ? (
                  <>
                    <BookmarkSolid className="w-5 h-5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <BookmarkOutline className="w-5 h-5" />
                    <span>Save Hustle</span>
                  </>
                )}
              </button>
              <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
                <ChartBarIcon className="w-5 h-5" />
                <span>Use Budget Planner</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard; 