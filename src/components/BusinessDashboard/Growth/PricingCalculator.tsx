import React, { useState } from 'react';

interface CostBreakdown {
  materialCost: number;
  laborCost: number;
  overheadCost: number;
  transportCost: number;
  otherCosts: number;
}

const PricingCalculator: React.FC = () => {
  const [costs, setCosts] = useState<CostBreakdown>({
    materialCost: 0,
    laborCost: 0,
    overheadCost: 0,
    transportCost: 0,
    otherCosts: 0,
  });

  const [desiredProfitMargin, setDesiredProfitMargin] = useState(30); // Default 30%

  const totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
  const suggestedPrice = totalCost * (1 + desiredProfitMargin / 100);
  const profitAmount = suggestedPrice - totalCost;

  const handleCostChange = (key: keyof CostBreakdown, value: string) => {
    setCosts({
      ...costs,
      [key]: Number(value) || 0,
    });
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing Calculator</h2>

      {/* Cost Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Material Cost
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">KES</span>
            </div>
            <input
              type="number"
              value={costs.materialCost || ''}
              onChange={(e) => handleCostChange('materialCost', e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-4 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Labor Cost
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">KES</span>
            </div>
            <input
              type="number"
              value={costs.laborCost || ''}
              onChange={(e) => handleCostChange('laborCost', e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-4 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overhead Cost
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">KES</span>
            </div>
            <input
              type="number"
              value={costs.overheadCost || ''}
              onChange={(e) => handleCostChange('overheadCost', e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-4 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transport Cost
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">KES</span>
            </div>
            <input
              type="number"
              value={costs.transportCost || ''}
              onChange={(e) => handleCostChange('transportCost', e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-4 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Other Costs
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">KES</span>
            </div>
            <input
              type="number"
              value={costs.otherCosts || ''}
              onChange={(e) => handleCostChange('otherCosts', e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-4 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Desired Profit Margin (%)
          </label>
          <input
            type="number"
            value={desiredProfitMargin}
            onChange={(e) => setDesiredProfitMargin(Number(e.target.value) || 0)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="30"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-indigo-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-indigo-800 mb-2">Total Cost</h3>
            <p className="text-2xl font-bold text-indigo-900">{formatCurrency(totalCost)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-indigo-800 mb-2">Profit Amount</h3>
            <p className="text-2xl font-bold text-indigo-900">{formatCurrency(profitAmount)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-indigo-800 mb-2">Suggested Price</h3>
            <p className="text-2xl font-bold text-indigo-900">{formatCurrency(suggestedPrice)}</p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-indigo-800 mb-4">Cost Breakdown</h3>
          <div className="space-y-2">
            {Object.entries(costs).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <div className="flex-1">
                  <div className="h-2 bg-indigo-100 rounded-full">
                    <div
                      className="h-2 bg-indigo-600 rounded-full"
                      style={{
                        width: `${(value / totalCost) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="ml-4 flex items-center">
                  <span className="text-sm text-indigo-600 min-w-[120px]">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="ml-2 text-sm font-medium text-indigo-900">
                    {formatCurrency(value)}
                  </span>
                  <span className="ml-2 text-xs text-indigo-500">
                    ({((value / totalCost) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator; 