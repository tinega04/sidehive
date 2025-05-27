import React from 'react';
import WelcomeBox from '../components/dashboard/WelcomeBox';
import ProgressTracker from '../components/dashboard/ProgressTracker';
import HustleOfTheWeek from '../components/dashboard/HustleOfTheWeek';
import RecentActivity from '../components/dashboard/RecentActivity';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WelcomeBox />
          <ProgressTracker />
          <HustleOfTheWeek />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 