import React, { useState } from 'react';
import { SalesEntry } from '../../types/business';

interface SalesTrackerProps {
  initialSales?: SalesEntry[];
  onUpdate: (sales: SalesEntry[]) => void;
}

export const SalesTracker: React.FC<SalesTrackerProps> = ({ initialSales = [], onUpdate }) => {
  const [sales, setSales] = useState<SalesEntry[]>(initialSales);
  const [newSale, setNewSale] = useState<Omit<SalesEntry, 'id' | 'total'>>({
    date: new Date().toISOString().split('T')[0],
    item: '',
    quantity: 0,
    unitPrice: 0
  });

  const addSale = () => {
    const sale: SalesEntry = {
      id: Date.now().toString(),
      ...newSale,
      total: newSale.quantity * newSale.unitPrice
    };
    const updatedSales = [...sales, sale];
    setSales(updatedSales);
    onUpdate(updatedSales);
    setNewSale({
      date: new Date().toISOString().split('T')[0],
      item: '',
      quantity: 0,
      unitPrice: 0
    });
  };

  const removeSale = (id: string) => {
    const updatedSales = sales.filter(sale => sale.id !== id);
    setSales(updatedSales);
    onUpdate(updatedSales);
  };

  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sales Tracker</h3>
      
      {/* Add new sale form */}
      <div className="grid grid-cols-5 gap-2">
        <input
          type="date"
          value={newSale.date}
          onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={newSale.item}
          onChange={(e) => setNewSale({ ...newSale, item: e.target.value })}
          placeholder="Item"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={newSale.quantity}
          onChange={(e) => setNewSale({ ...newSale, quantity: Number(e.target.value) })}
          placeholder="Quantity"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={newSale.unitPrice}
          onChange={(e) => setNewSale({ ...newSale, unitPrice: Number(e.target.value) })}
          placeholder="Unit Price (KES)"
          className="p-2 border rounded"
        />
        <button
          onClick={addSale}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Sale
        </button>
      </div>

      {/* Sales list */}
      <div className="mt-4">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-right">Quantity</th>
              <th className="p-2 text-right">Unit Price</th>
              <th className="p-2 text-right">Total</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b">
                <td className="p-2">{sale.date}</td>
                <td className="p-2">{sale.item}</td>
                <td className="p-2 text-right">{sale.quantity}</td>
                <td className="p-2 text-right">KES {sale.unitPrice.toLocaleString()}</td>
                <td className="p-2 text-right">KES {sale.total.toLocaleString()}</td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => removeSale(sale.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td colSpan={4} className="p-2 text-right">Total Sales:</td>
              <td className="p-2 text-right">KES {totalSales.toLocaleString()}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}; 