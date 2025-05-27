import React from 'react';
import { ClockIcon, EyeIcon, BookmarkIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface Activity {
  id: string;
  type: 'view' | 'save' | 'tool';
  businessId?: string;
  businessName?: string;
  toolName?: string;
  timestamp: Date;
}

export const RecentActivity = () => {
  // Mock data - replace with real data from state management
  const activities: Activity[] = [
    {
      id: '1',
      type: 'view',
      businessId: 'liquid-soap',
      businessName: 'Liquid Soap Refilling Station',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: '2',
      type: 'save',
      businessId: 'mobile-food',
      businessName: 'Mobile Food Cart',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: '3',
      type: 'tool',
      toolName: 'Budget Planner',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    },
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'view':
        return <EyeIcon className="w-5 h-5 text-blue-500" />;
      case 'save':
        return <BookmarkIcon className="w-5 h-5 text-green-500" />;
      case 'tool':
        return <WrenchScrewdriverIcon className="w-5 h-5 text-purple-500" />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'view':
        return `Viewed ${activity.businessName}`;
      case 'save':
        return `Saved ${activity.businessName}`;
      case 'tool':
        return `Used ${activity.toolName}`;
    }
  };

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 1000 / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <ClockIcon className="w-6 h-6 text-gray-500 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            {getActivityIcon(activity.type)}
            <div className="flex-1">
              <Link
                to={activity.businessId ? `/business/${activity.businessId}` : '/tools'}
                className="text-gray-800 hover:text-blue-600"
              >
                {getActivityText(activity)}
              </Link>
              <p className="text-sm text-gray-500">{getTimeAgo(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity; 