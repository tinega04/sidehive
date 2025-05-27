import React from 'react';
import { useBusinessStore } from '../store/businessStore';
import {
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const SavedHustles = () => {
  const { savedHustles, removeSavedHustle, updateHustleNotes, updateHustleProgress, updateHustleChecklist } = useBusinessStore();

  const progressOptions = [
    { value: 'planning', label: 'Planning' },
    { value: 'started', label: 'Started' },
    { value: 'launched', label: 'Launched' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Hustles</h1>

      {savedHustles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg mb-4">
            You haven't saved any business ideas yet.
          </p>
          <a
            href="/browse"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Browse Ideas →
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {savedHustles.map((hustle) => (
            <div
              key={hustle.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {hustle.title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <select
                      value={hustle.progress}
                      onChange={(e) =>
                        updateHustleProgress(hustle.id, e.target.value as any)
                      }
                      className="border border-gray-300 rounded-md text-sm p-1"
                    >
                      {progressOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeSavedHustle(hustle.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Notes Section */}
                  <div>
                    <div className="flex items-center mb-2">
                      <PencilIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">Notes</h3>
                    </div>
                    <textarea
                      value={hustle.notes}
                      onChange={(e) =>
                        updateHustleNotes(hustle.id, e.target.value)
                      }
                      placeholder="Add your notes here..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Checklist Section */}
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircleIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Setup Checklist
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {hustle.checklist.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) =>
                              updateHustleChecklist(
                                hustle.id,
                                item.id,
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span
                            className={`flex-1 ${
                              item.completed ? 'text-gray-500 line-through' : ''
                            }`}
                          >
                            {item.task}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Setup Progress</span>
                    <span>
                      {Math.round(
                        (hustle.checklist.filter((item) => item.completed).length /
                          hustle.checklist.length) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (hustle.checklist.filter((item) => item.completed)
                            .length /
                            hustle.checklist.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedHustles; 