import React from 'react';
import { BusinessOverview } from '../../types/businessDashboard';

interface OverviewProps {
  overview: BusinessOverview;
}

const Overview: React.FC<OverviewProps> = ({ overview }) => {
  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{overview.title}</h1>
      <p className="text-gray-600 mb-6">{overview.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Capital Range */}
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Startup Capital</h3>
          <p className="text-lg font-semibold text-indigo-900">
            {formatCurrency(overview.capitalRange.min)} - {formatCurrency(overview.capitalRange.max)}
          </p>
        </div>

        {/* Risk Level */}
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Risk Level</h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${overview.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
              overview.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}>
            {overview.riskLevel}
          </div>
        </div>

        {/* Time to Break Even */}
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Break Even Time</h3>
          <p className="text-lg font-semibold text-indigo-900">
            {overview.timeToBreakEven} {overview.timeToBreakEven === 1 ? 'month' : 'months'}
          </p>
        </div>

        {/* Monthly Profit Range */}
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Monthly Profit Range</h3>
          <p className="text-lg font-semibold text-indigo-900">
            {formatCurrency(overview.monthlyProfitRange.min)} - {formatCurrency(overview.monthlyProfitRange.max)}
          </p>
        </div>

        {/* Ideal Customer */}
        <div className="bg-indigo-50 rounded-lg p-4 md:col-span-2 lg:col-span-2">
          <h3 className="text-sm font-medium text-indigo-800 mb-3">Ideal Customer Profile</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-medium text-indigo-600 mb-1">Demographics</h4>
              <div className="flex flex-wrap gap-2">
                {overview.idealCustomer.demographics.map((demo) => (
                  <span key={demo} className="bg-white px-2 py-1 rounded text-sm text-indigo-600">
                    {demo}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-indigo-600 mb-1">Location</h4>
              <div className="flex flex-wrap gap-2">
                {overview.idealCustomer.location.map((loc) => (
                  <span key={loc} className="bg-white px-2 py-1 rounded text-sm text-indigo-600">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-indigo-600 mb-1">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {overview.idealCustomer.interests.map((interest) => (
                  <span key={interest} className="bg-white px-2 py-1 rounded text-sm text-indigo-600">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 