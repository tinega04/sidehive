import React from 'react';
import { useAuthStore } from '../store/authStore';
import { liquidSoapBusiness } from '../data/businesses/liquid-soap-refilling';

const motivationalTips = [
  "Start small, think big. Every successful business started with a single step.",
  "Your next big opportunity might be hiding in plain sight.",
  "Success is not final, failure is not fatal: it's the courage to continue that counts.",
  "The best time to start was yesterday. The next best time is now.",
];

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const randomTip = motivationalTips[Math.floor(Math.random() * motivationalTips.length)];

  return (
    <div className="space-y-6">
      {/* Welcome Box */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || 'Entrepreneur'}!
            </h1>
            <p className="mt-1 text-gray-500">
              {randomTip}
            </p>
          </div>
          <div className="bg-indigo-50 p-3 rounded-full">
            <span className="text-2xl">👋</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Tracker */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Hustles Explored</span>
                <span>3 of 50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '6%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Tools Used</span>
                <span>2 of 8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600">👀</span>
              </div>
              <div>
                <p className="text-sm text-gray-900">You viewed Baby Clothes Reseller</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">💾</span>
              </div>
              <div>
                <p className="text-sm text-gray-900">Saved Liquid Soap Refilling Business</p>
                <p className="text-xs text-gray-500">4 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hustle of the Week */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Hustle of the Week</h2>
          <span className="text-sm text-gray-500">Featured</span>
        </div>
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {liquidSoapBusiness.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {liquidSoapBusiness.description}
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm text-gray-500">Startup Capital</p>
                <p className="text-lg font-medium text-gray-900">
                  KES {liquidSoapBusiness.startupCapital.min.toLocaleString()} - {liquidSoapBusiness.startupCapital.max.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Profit</p>
                <p className="text-lg font-medium text-green-600">
                  KES {liquidSoapBusiness.monthlyProfit.min.toLocaleString()} - {liquidSoapBusiness.monthlyProfit.max.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
            Learn More
          </button>
        </div>
      </div>

      {/* NicheGPT Quick Prompt Placeholder */}
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">NicheGPT Assistant</h2>
        <p className="text-gray-600">
          Coming soon! Get personalized business advice and insights from our AI assistant.
        </p>
      </div>
    </div>
  );
};

export default Dashboard; 