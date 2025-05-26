import React, { useState } from 'react';
import { ExpenseEntry } from '../../../types/businessDashboard';

interface ExpenseTrackerProps {
  expenses: ExpenseEntry[];
  onUpdate: (expenses: ExpenseEntry[]) => void;
}

const EXPENSE_CATEGORIES = [
  'Transport',
  'Raw Materials',
  'Rent',
  'Utilities',
  'Marketing',
  'Equipment',
  'Labor',
  'Other',
];

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ expenses, onUpdate }) => {
  const [newExpense, setNewExpense] = useState<Partial<ExpenseEntry>>({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: 0,
  });

  const handleAddExpense = () => {
    if (newExpense.date && newExpense.category && newExpense.description && newExpense.amount) {
      const expense: ExpenseEntry = {
        id: Date.now().toString(),
        date: newExpense.date,
        category: newExpense.category,
        description: newExpense.description,
        amount: Number(newExpense.amount),
      };

      onUpdate([...expenses, expense]);
      setNewExpense({
        date: new Date().toISOString().split('T')[0],
        category: '',
        description: '',
        amount: 0,
      });
    }
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    onUpdate(updatedExpenses);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Expense Tracker</h2>

      {/* Add Expense Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Category</option>
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Amount (KES)"
          value={newExpense.amount || ''}
          onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
          className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="md:col-span-4">
          <button
            onClick={handleAddExpense}
            disabled={!newExpense.date || !newExpense.category || !newExpense.description || !newExpense.amount}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Expense
          </button>
        </div>
      </div>

      {/* Expense Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold text-indigo-900">
            KES {totalExpenses.toLocaleString()}
          </p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Expenses by Category</h3>
          <div className="space-y-2">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between">
                <span className="text-sm text-indigo-600">{category}</span>
                <span className="text-sm font-medium text-indigo-900">
                  KES {amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {expense.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  KES {expense.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
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

export default ExpenseTracker; 