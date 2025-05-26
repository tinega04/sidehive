import React, { useState } from 'react';
import { BusinessPlan as BusinessPlanType } from '../../../types/businessDashboard';

interface BusinessPlanProps {
  plan: BusinessPlanType;
  onUpdate: (plan: BusinessPlanType) => void;
}

const BusinessPlan: React.FC<BusinessPlanProps> = ({ plan, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedPlan, setEditedPlan] = useState(plan);

  const handleSave = () => {
    onUpdate(editedPlan);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedPlan(plan);
    setEditMode(false);
  };

  const renderSection = (title: string, content: string, field: keyof BusinessPlanType) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {editMode ? (
        <textarea
          value={content}
          onChange={(e) => setEditedPlan({ ...editedPlan, [field]: e.target.value })}
          className="w-full h-32 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      ) : (
        <p className="text-gray-600 whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );

  const renderListSection = (
    title: string,
    items: string[],
    field: 'revenueStreams' | 'operations.daily' | 'operations.monthly'
  ) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {editMode ? (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index] = e.target.value;
                  if (field === 'revenueStreams') {
                    setEditedPlan({ ...editedPlan, revenueStreams: newItems });
                  } else {
                    const [parent, child] = field.split('.');
                    setEditedPlan({
                      ...editedPlan,
                      operations: {
                        ...editedPlan.operations,
                        [child]: newItems,
                      },
                    });
                  }
                }}
                className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={() => {
                  const newItems = items.filter((_, i) => i !== index);
                  if (field === 'revenueStreams') {
                    setEditedPlan({ ...editedPlan, revenueStreams: newItems });
                  } else {
                    const [parent, child] = field.split('.');
                    setEditedPlan({
                      ...editedPlan,
                      operations: {
                        ...editedPlan.operations,
                        [child]: newItems,
                      },
                    });
                  }
                }}
                className="text-red-600 hover:text-red-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newItems = [...items, ''];
              if (field === 'revenueStreams') {
                setEditedPlan({ ...editedPlan, revenueStreams: newItems });
              } else {
                const [parent, child] = field.split('.');
                setEditedPlan({
                  ...editedPlan,
                  operations: {
                    ...editedPlan.operations,
                    [child]: newItems,
                  },
                });
              }
            }}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            + Add Item
          </button>
        </div>
      ) : (
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Business Plan</h2>
        <div className="space-x-2">
          {editMode ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
            >
              Edit Plan
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {renderSection('Introduction', editedPlan.introduction, 'introduction')}
        {renderSection('Market Need', editedPlan.marketNeed, 'marketNeed')}
        {renderSection('Target Customer', editedPlan.targetCustomer, 'targetCustomer')}
        {renderListSection('Revenue Streams', editedPlan.revenueStreams, 'revenueStreams')}
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Operations</h3>
          {renderListSection('Daily Operations', editedPlan.operations.daily, 'operations.daily')}
          {renderListSection('Monthly Operations', editedPlan.operations.monthly, 'operations.monthly')}
        </div>
      </div>
    </div>
  );
};

export default BusinessPlan; 