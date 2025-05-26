import React, { useState } from 'react';
import { useStore, getFilteredBusinessIdeas } from './store/store';
import { useAuthStore } from './store/authStore';
import { BusinessIdea, Industry, CapitalTier } from './types/types';
import Filters from './components/Filters';
import BusinessCard from './components/BusinessCard';
import BusinessModal from './components/BusinessModal';
import CategoryCard from './components/CategoryCard';
import Layout from './components/Layout';
import AuthForm from './components/AuthForm';

const App: React.FC = () => {
  const { industry, capitalTier, setIndustry } = useStore();
  const { isAuthenticated, logout } = useAuthStore();
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Industry | null>(null);

  const filteredIdeas = getFilteredBusinessIdeas(selectedCategory || 'all', capitalTier);

  const handleViewDetails = (idea: BusinessIdea) => {
    setSelectedIdea(idea);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIdea(null);
  };

  const handleCategorySelect = (category: Industry) => {
    setSelectedCategory(category);
    setIndustry(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setIndustry('all');
  };

  const handleLogout = () => {
    logout();
    setShowExplore(false);
  };

  if (!showExplore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              SideHive Kenya
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto">
              Discover profitable side hustles tailored for aspiring Kenyan entrepreneurs. Start your journey with minimal capital.
            </p>
            {!isAuthenticated ? (
              <div className="max-w-md mx-auto">
                <AuthForm onSuccess={() => setShowExplore(true)} />
              </div>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={() => setShowExplore(true)}
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  Explore Hustles
                </button>
                <button
                  onClick={handleLogout}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <AuthForm onSuccess={() => setShowExplore(true)} />
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {selectedCategory ? selectedCategory : 'Browse by Industry'}
            </h2>
            <p className="text-gray-500 mt-1">
              {selectedCategory ? 'Browse business ideas in this category' : 'Select an industry to explore business ideas'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Sign Out
          </button>
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(Industry).map((category) => (
              <CategoryCard
                key={category}
                category={category}
                onSelect={() => handleCategorySelect(category)}
              />
            ))}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={handleBackToCategories}
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Categories
              </button>
            </div>

            <Filters />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredIdeas.map((idea) => (
                <BusinessCard
                  key={idea.id}
                  idea={idea}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {filteredIdeas.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg">
                  No business ideas found with the selected filters.
                </p>
              </div>
            )}
          </div>
        )}

        <BusinessModal
          idea={selectedIdea}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </Layout>
  );
};

export default App; 