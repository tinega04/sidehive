import React from 'react';
import CostEstimator from './CostEstimator';
import BusinessPlan from './BusinessPlan';
import Suppliers from './Suppliers';
import { BusinessDashboard } from '../../../types/businessDashboard';

interface StartupToolkitProps {
  data: BusinessDashboard['startupToolkit'];
  onUpdate: (data: BusinessDashboard['startupToolkit']) => void;
}

const StartupToolkit: React.FC<StartupToolkitProps> = ({ data, onUpdate }) => {
  const handleCostsUpdate = (costs: typeof data.businessPlan.startupCosts) => {
    onUpdate({
      ...data,
      businessPlan: {
        ...data.businessPlan,
        startupCosts: costs,
      },
    });
  };

  const handlePlanUpdate = (plan: typeof data.businessPlan) => {
    onUpdate({
      ...data,
      businessPlan: plan,
    });
  };

  const handleSuppliersUpdate = (suppliers: typeof data.suppliers) => {
    onUpdate({
      ...data,
      suppliers,
    });
  };

  return (
    <div className="space-y-6">
      <CostEstimator
        initialCosts={data.businessPlan.startupCosts}
        onCostsUpdate={handleCostsUpdate}
      />
      <BusinessPlan
        plan={data.businessPlan}
        onUpdate={handlePlanUpdate}
      />
      <Suppliers
        suppliers={data.suppliers}
        onUpdate={handleSuppliersUpdate}
      />
    </div>
  );
};

export default StartupToolkit; 