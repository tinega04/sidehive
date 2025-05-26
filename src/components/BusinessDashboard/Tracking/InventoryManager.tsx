import React, { useState } from 'react';
import { InventoryItem } from '../../../types/businessDashboard';

interface InventoryManagerProps {
  inventory: InventoryItem[];
  onUpdate: (inventory: InventoryItem[]) => void;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ inventory, onUpdate }) => {
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: '',
    quantity: 0,
    unit: '',
    reorderPoint: undefined,
  });
  const [stockAdjustment, setStockAdjustment] = useState<{
    itemId: string;
    quantity: number;
    type: 'in' | 'out';
  }>({
    itemId: '',
    quantity: 0,
    type: 'in',
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity !== undefined && newItem.unit) {
      const item: InventoryItem = {
        id: Date.now().toString(),
        name: newItem.name,
        quantity: Number(newItem.quantity),
        unit: newItem.unit,
        reorderPoint: newItem.reorderPoint ? Number(newItem.reorderPoint) : undefined,
      };

      onUpdate([...inventory, item]);
      setNewItem({
        name: '',
        quantity: 0,
        unit: '',
        reorderPoint: undefined,
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    const updatedInventory = inventory.filter((item) => item.id !== id);
    onUpdate(updatedInventory);
  };

  const handleStockAdjustment = () => {
    if (stockAdjustment.itemId && stockAdjustment.quantity > 0) {
      const updatedInventory = inventory.map((item) =>
        item.id === stockAdjustment.itemId
          ? {
              ...item,
              quantity:
                stockAdjustment.type === 'in'
                  ? item.quantity + stockAdjustment.quantity
                  : Math.max(0, item.quantity - stockAdjustment.quantity),
            }
          : item
      );

      onUpdate(updatedInventory);
      setStockAdjustment({
        itemId: '',
        quantity: 0,
        type: 'in',
      });
    }
  };

  const getLowStockItems = () => {
    return inventory.filter(
      (item) => item.reorderPoint !== undefined && item.quantity <= item.reorderPoint
    );
  };

  const lowStockItems = getLowStockItems();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Inventory Manager</h2>

      {/* Add New Item Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Initial Quantity"
          value={newItem.quantity || ''}
          onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Unit (e.g., pcs, kg, L)"
          value={newItem.unit}
          onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Reorder Point (optional)"
          value={newItem.reorderPoint || ''}
          onChange={(e) => setNewItem({ ...newItem, reorderPoint: Number(e.target.value) })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="md:col-span-4">
          <button
            onClick={handleAddItem}
            disabled={!newItem.name || newItem.quantity === undefined || !newItem.unit}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Stock Adjustment Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={stockAdjustment.itemId}
          onChange={(e) => setStockAdjustment({ ...stockAdjustment, itemId: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Item</option>
          {inventory.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={stockAdjustment.quantity || ''}
          onChange={(e) =>
            setStockAdjustment({ ...stockAdjustment, quantity: Number(e.target.value) })
          }
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={stockAdjustment.type}
          onChange={(e) =>
            setStockAdjustment({
              ...stockAdjustment,
              type: e.target.value as 'in' | 'out',
            })
          }
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="in">Stock In</option>
          <option value="out">Stock Out</option>
        </select>
        <button
          onClick={handleStockAdjustment}
          disabled={!stockAdjustment.itemId || !stockAdjustment.quantity}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update Stock
        </button>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Low Stock Alert</h3>
          <div className="space-y-2">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm text-yellow-700">{item.name}</span>
                <span className="text-sm font-medium text-yellow-800">
                  {item.quantity} {item.unit} remaining
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reorder Point
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.reorderPoint || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManager; 