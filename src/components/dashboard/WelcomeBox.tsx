import React from 'react';
import { useAuthStore } from '../../store/authStore';

const tips = [
  "Start small, think big. Every successful business started with a single step.",
  "Focus on solving real problems in your community.",
  "Your first customers are your best teachers.",
  "Don't wait for perfect - start with what you have.",
  "Network and learn from other entrepreneurs.",
];

export const WelcomeBox = () => {
  const { user } = useAuthStore();
  const todaysTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome back, {user?.name || 'Entrepreneur'}! 👋
      </h2>
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <p className="text-blue-800 font-medium">Today's Tip:</p>
        <p className="text-blue-600 italic">{todaysTip}</p>
      </div>
    </div>
  );
};

export default WelcomeBox; 