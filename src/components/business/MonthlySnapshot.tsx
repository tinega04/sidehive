import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { MonthlySnapshot as MonthlySnapshotType } from '../../types/business';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlySnapshotProps {
  data: MonthlySnapshotType[];
}

export const MonthlySnapshot: React.FC<MonthlySnapshotProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(d => d.revenue),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Expenses',
        data: data.map(d => d.expenses),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Profit',
        data: data.map(d => d.profit),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Business Performance'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `KES ${value.toLocaleString()}`
        }
      }
    }
  };

  const totalRevenue = data.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = data.reduce((sum, month) => sum + month.expenses, 0);
  const totalProfit = data.reduce((sum, month) => sum + month.profit, 0);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Monthly Performance</h3>
      
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 rounded">
          <div className="text-sm text-green-800">Total Revenue</div>
          <div className="text-xl font-semibold text-green-900">
            KES {totalRevenue.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-red-100 rounded">
          <div className="text-sm text-red-800">Total Expenses</div>
          <div className="text-xl font-semibold text-red-900">
            KES {totalExpenses.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-blue-100 rounded">
          <div className="text-sm text-blue-800">Total Profit</div>
          <div className="text-xl font-semibold text-blue-900">
            KES {totalProfit.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}; 