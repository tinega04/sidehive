import React from 'react';
import MonthlySnapshot from './MonthlySnapshot';
import PricingCalculator from './PricingCalculator';
import MarketingTips from './MarketingTips';
import { BusinessDashboard } from '../../../types/businessDashboard';

interface GrowthProps {
  data: BusinessDashboard['growth'];
  onUpdate: (data: BusinessDashboard['growth']) => void;
}

const Growth: React.FC<GrowthProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <MonthlySnapshot snapshots={data.monthlySnapshots} />
      <PricingCalculator />
      <MarketingTips tips={data.marketingTips} />
    </div>
  );
};

export default Growth; 