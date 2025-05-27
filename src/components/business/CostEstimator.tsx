import React, { useState } from 'react';

interface CostItem {
  id: string;
  item: string;
  amount: number;
}

interface CostEstimatorProps {
  initialCosts: CostItem[];
  onUpdate: (costs: CostItem[]) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ initialCosts, onUpdate }) => {
  const [costs, setCosts] = useState<CostItem[]>(initialCosts);

  const addCostItem = () => {
    const newItem: CostItem = {
      id: Date.now().toString(),
      item: '',
      amount: 0
    };
    setCosts([...costs, newItem]);
    onUpdate([...costs, newItem]);
  };

  const updateCostItem = (id: string, field: keyof CostItem, value: string | number) => {
    const updatedCosts = costs.map(cost => {
      if (cost.id === id) {
        return { ...cost, [field]: value };
      }
      return cost;
    });
    setCosts(updatedCosts);
    onUpdate(updatedCosts);
  };

  const removeCostItem = (id: string) => {
    const updatedCosts = costs.filter(cost => cost.id !== id);
    setCosts(updatedCosts);
    onUpdate(updatedCosts);
  };

  const total = costs.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Startup Cost Estimator</h3>
      <div className="space-y-2">
        {costs.map((cost) => (
          <div key={cost.id} className="flex items-center gap-2">
            <input
              type="text"
              value={cost.item}
              onChange={(e) => updateCostItem(cost.id, 'item', e.target.value)}
              placeholder="Item description"
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              value={cost.amount}
              onChange={(e) => updateCostItem(cost.id, 'amount', Number(e.target.value))}
              placeholder="Amount (KES)"
              className="w-32 p-2 border rounded"
            />
            <button
              onClick={() => removeCostItem(cost.id)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={addCostItem}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Item
        </button>
        <div className="text-lg">
          Total: KES {total.toLocaleString()}
        </div>
      </div>
    </div>
  );
}; 