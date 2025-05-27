import React from 'react';

interface BusinessPlanData {
  introduction: string;
  marketNeed: string;
  targetCustomer: string;
  startupCostBreakdown: string;
  revenueStreams: string;
  operations: string;
}

interface BusinessPlanSection {
  title: string;
  content: string;
}

interface BusinessPlanProps {
  plan: BusinessPlanData;
  onUpdate: (section: keyof BusinessPlanData, content: string) => void;
}

export const BusinessPlan: React.FC<BusinessPlanProps> = ({ plan, onUpdate }) => {
  const sections: BusinessPlanSection[] = [
    { title: 'Introduction', content: plan.introduction },
    { title: 'Market Need', content: plan.marketNeed },
    { title: 'Target Customer', content: plan.targetCustomer },
    { title: 'Startup Cost Breakdown', content: plan.startupCostBreakdown },
    { title: 'Revenue Streams', content: plan.revenueStreams },
    { title: 'Daily/Monthly Operations', content: plan.operations }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Business Plan</h3>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="space-y-2">
            <h4 className="font-medium">{section.title}</h4>
            <textarea
              value={section.content}
              onChange={(e) => onUpdate(
                section.title.toLowerCase().replace(/[^a-z]/g, '') as keyof BusinessPlanData,
                e.target.value
              )}
              className="w-full h-32 p-2 border rounded resize-y"
              placeholder={`Enter ${section.title.toLowerCase()}...`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export Plan
        </button>
      </div>
    </div>
  );
}; 