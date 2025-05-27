import React, { useState, useMemo } from 'react';
import Filters from '../components/browse/Filters';
import BusinessCard from '../components/browse/BusinessCard';
import { useBusinessStore } from '../store/businessStore';
import { liquidSoapBusiness } from '../data/businesses/liquid-soap-refilling';

const BrowseIdeas = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCapital, setSelectedCapital] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const { savedHustles, saveHustle, removeSavedHustle } = useBusinessStore();

  // Mock data - replace with real data from API or store
  const businesses = [liquidSoapBusiness];

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      if (selectedIndustry !== 'All' && business.industry !== selectedIndustry) {
        return false;
      }

      if (selectedCapital !== 'All') {
        const [min, max] = selectedCapital.split('-').map((v) => {
          if (v.endsWith('K')) {
            return parseInt(v.replace('K', '')) * 1000;
          }
          if (v.endsWith('+')) {
            return parseInt(v.replace('+', ''));
          }
          return parseInt(v);
        });

        if (
          business.capitalRequired.min < min ||
          (max && business.capitalRequired.max > max)
        ) {
          return false;
        }
      }

      if (selectedTag !== 'All' && !business.tags.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [businesses, selectedIndustry, selectedCapital, selectedTag]);

  const sortedBusinesses = useMemo(() => {
    return [...filteredBusinesses].sort((a, b) => {
      switch (sortBy) {
        case 'capital-asc':
          return a.capitalRequired.min - b.capitalRequired.min;
        case 'capital-desc':
          return b.capitalRequired.min - a.capitalRequired.min;
        case 'newest':
          return -1; // Mock sorting, replace with real timestamp comparison
        default:
          return -1; // Mock popularity sorting
      }
    });
  }, [filteredBusinesses, sortBy]);

  const handleSaveToggle = (business: typeof businesses[0]) => {
    const isSaved = savedHustles.some((h) => h.id === business.id);
    if (isSaved) {
      removeSavedHustle(business.id);
    } else {
      saveHustle(business);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Ideas</h1>

      <Filters
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedCapital={selectedCapital}
        setSelectedCapital={setSelectedCapital}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBusinesses.map((business) => (
          <BusinessCard
            key={business.id}
            business={business}
            isSaved={savedHustles.some((h) => h.id === business.id)}
            onSave={() => handleSaveToggle(business)}
          />
        ))}
      </div>

      {sortedBusinesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No business ideas match your filters. Try adjusting your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseIdeas; 