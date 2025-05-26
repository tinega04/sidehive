import React, { useState } from 'react';
import { StartupCost } from '../../../types/businessDashboard';

interface CostEstimatorProps {
  initialCosts: StartupCost[];
  onCostsUpdate: (costs: StartupCost[]) => void;
}

const CostEstimator: React.FC<CostEstimatorProps> = ({ initialCosts, onCostsUpdate }) => {
  const [costs, setCosts] = useState<StartupCost[]>(initialCosts);
  const [newItem, setNewItem] = useState({
    category: '',
    item: '',
    amount: '',
    isRequired: true,
  });

  const handleAddItem = () => {
    if (newItem.category && newItem.item && newItem.amount) {
      const newCost: StartupCost = {
        id: Date.now().toString(),
        category: newItem.category,
        item: newItem.item,
        amount: Number(newItem.amount),
        isRequired: newItem.isRequired,
      };

      const updatedCosts = [...costs, newCost];
      setCosts(updatedCosts);
      onCostsUpdate(updatedCosts);
      setNewItem({ category: '', item: '', amount: '', isRequired: true });
    }
  };

  const handleRemoveItem = (id: string) => {
    const updatedCosts = costs.filter((cost) => cost.id !== id);
    setCosts(updatedCosts);
    onCostsUpdate(updatedCosts);
  };

  const totalRequired = costs
    .filter((cost) => cost.isRequired)
    .reduce((sum, cost) => sum + cost.amount, 0);

  const totalOptional = costs
    .filter((cost) => !cost.isRequired)
    .reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Startup Cost Estimator</h2>

      {/* Add New Item Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Item"
          value={newItem.item}
          onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Amount (KES)"
          value={newItem.amount}
          onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newItem.isRequired}
              onChange={(e) => setNewItem({ ...newItem, isRequired: e.target.checked })}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">Required</span>
          </label>
          <button
            onClick={handleAddItem}
            disabled={!newItem.category || !newItem.item || !newItem.amount}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Cost Items List */}
      <div className="space-y-4">
        {costs.map((cost) => (
          <div
            key={cost.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-500">Category</span>
                <p className="font-medium text-gray-900">{cost.category}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Item</span>
                <p className="font-medium text-gray-900">{cost.item}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Amount</span>
                <p className="font-medium text-gray-900">KES {cost.amount.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                cost.isRequired ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {cost.isRequired ? 'Required' : 'Optional'}
              </span>
              <button
                onClick={() => handleRemoveItem(cost.id)}
                className="text-red-600 hover:text-red-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-indigo-600">Required Costs</span>
            <p className="text-lg font-semibold text-indigo-900">
              KES {totalRequired.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-sm text-indigo-600">Optional Costs</span>
            <p className="text-lg font-semibold text-indigo-900">
              KES {totalOptional.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-indigo-100">
          <span className="text-sm text-indigo-600">Total Estimated Cost</span>
          <p className="text-xl font-bold text-indigo-900">
            KES {(totalRequired + totalOptional).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator; 