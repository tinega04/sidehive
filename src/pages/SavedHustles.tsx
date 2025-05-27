import React, { useState } from 'react';
import { BusinessIdea } from '../types/types';

interface SavedHustle extends BusinessIdea {
  notes: string;
  checklist: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  progress: number;
}

const defaultChecklist = [
  { id: '1', text: 'Research market and competitors', completed: false },
  { id: '2', text: 'Create business plan', completed: false },
  { id: '3', text: 'Identify suppliers and resources', completed: false },
  { id: '4', text: 'Calculate startup costs', completed: false },
  { id: '5', text: 'Set pricing strategy', completed: false },
  { id: '6', text: 'Plan marketing approach', completed: false },
];

const SavedHustles: React.FC = () => {
  // In a real app, this would be fetched from a backend or local storage
  const [savedHustles, setSavedHustles] = useState<SavedHustle[]>([
    {
      id: '1',
      title: 'Liquid Soap Refilling',
      description: 'Start a liquid soap refilling business with minimal capital',
      industry: 'Manufacturing',
      startupCapital: { min: 5000, max: 15000 },
      monthlyProfit: { min: 10000, max: 30000 },
      tags: ['Low Risk', 'High Demand'],
      notes: 'Need to research local suppliers and pricing in my area',
      checklist: [...defaultChecklist],
      progress: 0,
    },
  ]);

  const [selectedHustle, setSelectedHustle] = useState<SavedHustle | null>(null);

  const handleNoteChange = (hustleId: string, notes: string) => {
    setSavedHustles(prev =>
      prev.map(hustle =>
        hustle.id === hustleId ? { ...hustle, notes } : hustle
      )
    );
  };

  const toggleChecklistItem = (hustleId: string, itemId: string) => {
    setSavedHustles(prev =>
      prev.map(hustle => {
        if (hustle.id === hustleId) {
          const updatedChecklist = hustle.checklist.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          );
          const completedItems = updatedChecklist.filter(item => item.completed).length;
          const progress = Math.round((completedItems / updatedChecklist.length) * 100);
          
          return {
            ...hustle,
            checklist: updatedChecklist,
            progress,
          };
        }
        return hustle;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Hustles</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hustles List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Your Saved Ideas</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {savedHustles.map(hustle => (
                <button
                  key={hustle.id}
                  onClick={() => setSelectedHustle(hustle)}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${
                    selectedHustle?.id === hustle.id ? 'bg-indigo-50' : ''
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{hustle.title}</h3>
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${hustle.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{hustle.progress}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hustle Details */}
        {selectedHustle ? (
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedHustle.title}</h2>
              <p className="text-gray-600 mb-4">{selectedHustle.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Startup Capital</p>
                  <p className="text-lg font-medium text-gray-900">
                    KES {selectedHustle.startupCapital.min.toLocaleString()} - {selectedHustle.startupCapital.max.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Profit</p>
                  <p className="text-lg font-medium text-green-600">
                    KES {selectedHustle.monthlyProfit.min.toLocaleString()} - {selectedHustle.monthlyProfit.max.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
              <textarea
                value={selectedHustle.notes}
                onChange={(e) => handleNoteChange(selectedHustle.id, e.target.value)}
                className="w-full h-32 p-2 border border-gray-300 rounded-md"
                placeholder="Add your notes here..."
              />
            </div>

            {/* Checklist Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Startup Checklist</h3>
              <div className="space-y-3">
                {selectedHustle.checklist.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(selectedHustle.id, item.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500">Select a hustle to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedHustles; 