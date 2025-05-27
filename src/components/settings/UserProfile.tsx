import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';

const industries = [
  'Retail',
  'Food & Beverage',
  'Services',
  'Digital',
  'Manufacturing',
  'Agriculture',
];

const tags = [
  'quick-start',
  'high-profit',
  'low-risk',
  'trending',
  'eco-friendly',
];

export const UserProfile = () => {
  const { user, updateUser } = useAuthStore();
  const { preferences, updatePreferences } = usePreferencesStore();

  const handleIndustryToggle = (industry: string) => {
    const currentIndustries = preferences.preferredIndustries;
    const newIndustries = currentIndustries.includes(industry)
      ? currentIndustries.filter((i) => i !== industry)
      : [...currentIndustries, industry];
    
    updatePreferences({ preferredIndustries: newIndustries });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = preferences.interestedTags;
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    
    updatePreferences({ interestedTags: newTags });
  };

  const handleCapitalRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    updatePreferences({
      capitalRange: {
        ...preferences.capitalRange,
        [type]: numValue,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={user?.name || ''}
              onChange={(e) => updateUser({ ...user!, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              onChange={(e) => updateUser({ ...user!, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Preferred Industries */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Preferred Industries</h3>
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => handleIndustryToggle(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                preferences.preferredIndustries.includes(industry)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Interested Tags */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                preferences.interestedTags.includes(tag)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Capital Range */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Capital Range (KES)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Minimum</label>
            <input
              type="number"
              value={preferences.capitalRange.min}
              onChange={(e) => handleCapitalRangeChange('min', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Maximum</label>
            <input
              type="number"
              value={preferences.capitalRange.max}
              onChange={(e) => handleCapitalRangeChange('max', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={preferences.notificationSettings.email}
              onChange={(e) =>
                updatePreferences({
                  notificationSettings: {
                    ...preferences.notificationSettings,
                    email: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">Email notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={preferences.notificationSettings.push}
              onChange={(e) =>
                updatePreferences({
                  notificationSettings: {
                    ...preferences.notificationSettings,
                    push: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">Push notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 