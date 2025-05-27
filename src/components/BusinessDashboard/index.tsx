import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './Overview';
import StartupToolkit from './StartupToolkit';
import Tracking from './Tracking';
import Growth from './Growth';
import { BusinessDashboard as BusinessDashboardType } from '../../types/businessDashboard';
import { liquidSoapBusiness } from '../../data/businesses/liquid-soap-refilling';

const TAB_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'startup', label: 'Startup Toolkit' },
  { id: 'tracking', label: 'Run & Track' },
  { id: 'growth', label: 'Growth' },
] as const;

type TabId = typeof TAB_ITEMS[number]['id'];

const BusinessDashboard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [businessData, setBusinessData] = useState<BusinessDashboardType>(liquidSoapBusiness);

  const handleStartupToolkitUpdate = (data: BusinessDashboardType['startupToolkit']) => {
    setBusinessData({
      ...businessData,
      startupToolkit: data,
    });
  };

  const handleTrackingUpdate = (data: BusinessDashboardType['tracking']) => {
    setBusinessData({
      ...businessData,
      tracking: data,
    });
  };

  const handleGrowthUpdate = (data: BusinessDashboardType['growth']) => {
    setBusinessData({
      ...businessData,
      growth: data,
    });
  };

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {TAB_ITEMS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'overview' && (
          <Overview overview={businessData.overview} />
        )}
        {activeTab === 'startup' && (
          <StartupToolkit
            data={businessData.startupToolkit}
            onUpdate={handleStartupToolkitUpdate}
          />
        )}
        {activeTab === 'tracking' && (
          <Tracking
            data={businessData.tracking}
            onUpdate={handleTrackingUpdate}
          />
        )}
        {activeTab === 'growth' && (
          <Growth
            data={businessData.growth}
            onUpdate={handleGrowthUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard; 