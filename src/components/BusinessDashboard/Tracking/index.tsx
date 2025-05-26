import React from 'react';
import SalesTracker from './SalesTracker';
import ExpenseTracker from './ExpenseTracker';
import InventoryManager from './InventoryManager';
import { BusinessDashboard } from '../../../types/businessDashboard';

interface TrackingProps {
  data: BusinessDashboard['tracking'];
  onUpdate: (data: BusinessDashboard['tracking']) => void;
}

const Tracking: React.FC<TrackingProps> = ({ data, onUpdate }) => {
  const handleSalesUpdate = (sales: typeof data.sales) => {
    onUpdate({
      ...data,
      sales,
    });
  };

  const handleExpensesUpdate = (expenses: typeof data.expenses) => {
    onUpdate({
      ...data,
      expenses,
    });
  };

  const handleInventoryUpdate = (inventory: typeof data.inventory) => {
    onUpdate({
      ...data,
      inventory,
    });
  };

  return (
    <div className="space-y-6">
      <SalesTracker
        sales={data.sales}
        onUpdate={handleSalesUpdate}
      />
      <ExpenseTracker
        expenses={data.expenses}
        onUpdate={handleExpensesUpdate}
      />
      <InventoryManager
        inventory={data.inventory}
        onUpdate={handleInventoryUpdate}
      />
    </div>
  );
};

export default Tracking; 