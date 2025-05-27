import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useBusinessStore } from '../../store/businessStore';

const tips = [
  "Start small, think big. Every successful business started with a single step.",
  "Focus on solving real problems in your community.",
  "Your first customers are your best teachers.",
  "Don't wait for perfect - start with what you have.",
  "Network and learn from other entrepreneurs.",
];

export const WelcomeBox = () => {
  const { user } = useAuthStore();
  const { preferences } = usePreferencesStore();
  const { savedHustles } = useBusinessStore();
  const todaysTip = tips[Math.floor(Math.random() * tips.length)];

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getPersonalizedMessage = () => {
    if (savedHustles.length === 0) {
      return 'Start exploring business ideas tailored to your interests!';
    }
    if (preferences.preferredIndustries.length > 0) {
      return `We have new opportunities in ${preferences.preferredIndustries.join(', ')}!`;
    }
    return 'Continue exploring your entrepreneurial journey!';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {getTimeBasedGreeting()}, {user?.name || 'Entrepreneur'}! 👋
      </h2>
      <p className="text-gray-600 mb-4">{getPersonalizedMessage()}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-md p-4">
          <p className="text-blue-800 font-medium">Today's Tip:</p>
          <p className="text-blue-600 italic">{todaysTip}</p>
        </div>
        <div className="bg-green-50 rounded-md p-4">
          <p className="text-green-800 font-medium">Your Focus:</p>
          <p className="text-green-600">
            {preferences.preferredIndustries.length > 0
              ? `Industries: ${preferences.preferredIndustries.join(', ')}`
              : 'Set your preferred industries to get personalized recommendations!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox; 