import React, { useState } from 'react';
import { SalesEntry } from '../../../types/businessDashboard';

interface SalesTrackerProps {
  sales: SalesEntry[];
  onUpdate: (sales: SalesEntry[]) => void;
}

const SalesTracker: React.FC<SalesTrackerProps> = ({ sales, onUpdate }) => {
  const [newSale, setNewSale] = useState<Partial<SalesEntry>>({
    date: new Date().toISOString().split('T')[0],
    item: '',
    quantity: 0,
    unitPrice: 0,
  });

  const handleAddSale = () => {
    if (newSale.date && newSale.item && newSale.quantity && newSale.unitPrice) {
      const sale: SalesEntry = {
        id: Date.now().toString(),
        date: newSale.date,
        item: newSale.item,
        quantity: Number(newSale.quantity),
        unitPrice: Number(newSale.unitPrice),
        total: Number(newSale.quantity) * Number(newSale.unitPrice),
      };

      onUpdate([...sales, sale]);
      setNewSale({
        date: new Date().toISOString().split('T')[0],
        item: '',
        quantity: 0,
        unitPrice: 0,
      });
    }
  };

  const handleDeleteSale = (id: string) => {
    const updatedSales = sales.filter((sale) => sale.id !== id);
    onUpdate(updatedSales);
  };

  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Sales Tracker</h2>

      {/* Add Sale Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="date"
          value={newSale.date}
          onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Item"
          value={newSale.item}
          onChange={(e) => setNewSale({ ...newSale, item: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newSale.quantity || ''}
          onChange={(e) => setNewSale({ ...newSale, quantity: Number(e.target.value) })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Unit Price (KES)"
          value={newSale.unitPrice || ''}
          onChange={(e) => setNewSale({ ...newSale, unitPrice: Number(e.target.value) })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="md:col-span-4">
          <button
            onClick={handleAddSale}
            disabled={!newSale.date || !newSale.item || !newSale.quantity || !newSale.unitPrice}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Sale
          </button>
        </div>
      </div>

      {/* Sales Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(sale.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.item}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  KES {sale.unitPrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  KES {sale.total.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeleteSale(sale.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Total Sales
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                KES {totalSales.toLocaleString()}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SalesTracker; 