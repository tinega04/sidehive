import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Business } from '../../types/business';
import { CostEstimator } from '../../components/business/CostEstimator';
import { BusinessPlan } from '../../components/business/BusinessPlan';
import { SalesTracker } from '../../components/business/SalesTracker';
import { MonthlySnapshot } from '../../components/business/MonthlySnapshot';
import { liquidSoapBusiness } from '../../data/businesses/liquid-soap-refilling';

export const BusinessDashboard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // In a real app, this would fetch from an API/database
  const business = liquidSoapBusiness;
  
  const [currentBusiness, setCurrentBusiness] = useState<Business>(business);

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const updateBusinessPlan = (section: keyof Business['businessPlan'], content: string) => {
    setCurrentBusiness(prev => ({
      ...prev,
      businessPlan: {
        ...prev.businessPlan,
        [section]: content
      }
    }));
  };

  const updateStartupCosts = (costs: typeof business.startupCosts) => {
    setCurrentBusiness(prev => ({
      ...prev,
      startupCosts: costs
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Overview Section */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">{currentBusiness.title}</h1>
        <p className="text-gray-600 mb-6">{currentBusiness.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Startup Capital</h3>
            <p className="text-2xl text-blue-600">
              {formatCurrency(currentBusiness.startupCapital.min)} - {formatCurrency(currentBusiness.startupCapital.max)}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Monthly Profit Range</h3>
            <p className="text-2xl text-green-600">
              {formatCurrency(currentBusiness.monthlyProfit.min)} - {formatCurrency(currentBusiness.monthlyProfit.max)}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Time to Break Even</h3>
            <p className="text-2xl text-purple-600">
              {currentBusiness.timeToBreakEven} months
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Ideal Customer Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Demographics</h4>
              <ul className="list-disc list-inside text-gray-600">
                {currentBusiness.idealCustomer.demographics.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Location</h4>
              <ul className="list-disc list-inside text-gray-600">
                {currentBusiness.idealCustomer.location.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Interests</h4>
              <ul className="list-disc list-inside text-gray-600">
                {currentBusiness.idealCustomer.interests.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Startup Toolkit Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <CostEstimator
            initialCosts={currentBusiness.startupCosts}
            onUpdate={updateStartupCosts}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <BusinessPlan
            plan={currentBusiness.businessPlan}
            onUpdate={updateBusinessPlan}
          />
        </div>
      </div>

      {/* Suppliers Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Suppliers & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBusiness.suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">{supplier.name}</h3>
              <p className="text-gray-600 mb-2">{supplier.location}</p>
              <p className="text-gray-600 mb-4">{supplier.contact}</p>
              <h4 className="font-medium mb-2">Available Items:</h4>
              <ul className="list-disc list-inside text-gray-600">
                {supplier.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Run & Track Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <SalesTracker
            initialSales={[]}
            onUpdate={() => {}}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <MonthlySnapshot
            data={[
              {
                month: 'Jan 2024',
                revenue: 50000,
                expenses: 30000,
                profit: 20000
              },
              {
                month: 'Feb 2024',
                revenue: 65000,
                expenses: 35000,
                profit: 30000
              },
              {
                month: 'Mar 2024',
                revenue: 80000,
                expenses: 40000,
                profit: 40000
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}; 