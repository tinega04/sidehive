import React from 'react';
import NicheGPT from '../components/tools/NicheGPT';
import {
  CalculatorIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const Tools = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Business Tools</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - NicheGPT */}
        <div className="lg:col-span-2">
          <NicheGPT />
        </div>

        {/* Sidebar - Other Tools */}
        <div className="space-y-6">
          {/* Budget Planner */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <CalculatorIcon className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Budget Planner</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Plan your startup costs and monthly expenses with our budget calculator.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Create Budget
            </button>
          </div>

          {/* Business Checklist */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <ClipboardDocumentCheckIcon className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Business Checklist</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Generate a customized checklist for your business setup.
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              Generate Checklist
            </button>
          </div>

          {/* Profit Estimator */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Profit Estimator</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Calculate potential profits based on market data and expenses.
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
              Estimate Profits
            </button>
          </div>

          {/* Inventory Log */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <ClipboardDocumentListIcon className="w-6 h-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Inventory Log</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Track your inventory and manage stock levels efficiently.
            </p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">
              Manage Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools; 