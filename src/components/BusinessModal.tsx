import React from 'react';
import { BusinessIdea } from '../types/types';

interface BusinessModalProps {
  idea: BusinessIdea | null;
  isOpen: boolean;
  onClose: () => void;
}

const BusinessModal: React.FC<BusinessModalProps> = ({ idea, isOpen, onClose }) => {
  if (!isOpen || !idea) return null;

  const handleShare = (platform: 'whatsapp' | 'facebook') => {
    const text = `Check out this business idea: ${idea.title} on SideHive Kenya`;
    const url = window.location.href;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
    } else {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl leading-6 font-semibold text-gray-900 mb-4">
                    {idea.title}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="text-green-600 hover:text-green-700"
                    >
                      Share on WhatsApp
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Share on Facebook
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Overview</h4>
                    <p className="mt-1 text-gray-600">{idea.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Industry</h4>
                      <p className="mt-1 text-gray-600">{idea.industry}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Capital Tier</h4>
                      <p className="mt-1 text-gray-600">{idea.capitalRequired}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Estimated Startup Cost</h4>
                    <p className="mt-1 text-gray-600">{idea.estimatedStartupCost}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Tools/Materials Needed</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {idea.toolsNeeded.map((tool, index) => (
                        <li key={index}>{tool}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Setup Process</h4>
                    <ol className="mt-1 list-decimal list-inside text-gray-600">
                      {idea.setupProcess.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Revenue Streams</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {idea.revenueStreams.map((stream, index) => (
                        <li key={index}>{stream}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Challenges & Risks</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {idea.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Ideal Locations</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {idea.idealLocations.map((location, index) => (
                        <li key={index}>{location}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Success Tips</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {idea.successTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Monthly Income Range</h4>
                      <p className="mt-1 text-gray-600">{idea.monthlyIncomeRange}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Time Commitment</h4>
                      <p className="mt-1 text-gray-600">{idea.timeCommitment}</p>
                    </div>
                  </div>

                  {idea.realLifeExamples && idea.realLifeExamples.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Real-Life Examples</h4>
                      <ul className="mt-1 list-disc list-inside text-gray-600">
                        {idea.realLifeExamples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessModal; 