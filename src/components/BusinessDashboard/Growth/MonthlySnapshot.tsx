import React from 'react';
import { MonthlySnapshot as MonthlySnapshotType } from '../../../types/businessDashboard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MonthlySnapshotProps {
  snapshots: MonthlySnapshotType[];
}

const MonthlySnapshot: React.FC<MonthlySnapshotProps> = ({ snapshots }) => {
  const formatCurrency = (value: number) => {
    return `KES ${value.toLocaleString()}`;
  };

  const totalRevenue = snapshots.reduce((sum, snapshot) => sum + snapshot.revenue, 0);
  const totalExpenses = snapshots.reduce((sum, snapshot) => sum + snapshot.expenses, 0);
  const totalProfit = snapshots.reduce((sum, snapshot) => sum + snapshot.profit, 0);

  const averageRevenue = totalRevenue / (snapshots.length || 1);
  const averageExpenses = totalExpenses / (snapshots.length || 1);
  const averageProfit = totalProfit / (snapshots.length || 1);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Performance</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Average Monthly Revenue</h3>
          <p className="text-2xl font-bold text-indigo-900">
            {formatCurrency(averageRevenue)}
          </p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Average Monthly Expenses</h3>
          <p className="text-2xl font-bold text-indigo-900">
            {formatCurrency(averageExpenses)}
          </p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Average Monthly Profit</h3>
          <p className="text-2xl font-bold text-indigo-900">
            {formatCurrency(averageProfit)}
          </p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={snapshots}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelStyle={{ color: '#1F2937' }}
              contentStyle={{
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4F46E5"
              strokeWidth={2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={2}
              name="Expenses"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#10B981"
              strokeWidth={2}
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Details Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expenses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profit Margin
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {snapshots.map((snapshot, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {snapshot.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(snapshot.revenue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(snapshot.expenses)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(snapshot.profit)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {((snapshot.profit / snapshot.revenue) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlySnapshot; 