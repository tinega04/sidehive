import { BusinessDashboard } from '../../types/businessDashboard';

export const liquidSoapBusiness: BusinessDashboard = {
  overview: {
    title: 'Liquid Soap Refilling Business',
    slug: 'liquid-soap-refilling',
    description: 'Start a profitable liquid soap refilling business with minimal capital. Tap into the growing demand for affordable cleaning products in residential areas.',
    capitalRange: {
      min: 5000,
      max: 15000,
    },
    idealCustomer: {
      demographics: ['Households', 'Small businesses', 'Schools', 'Restaurants'],
      location: ['Residential areas', 'Market centers', 'Shopping centers'],
      interests: ['Cost-saving', 'Bulk buying', 'Environmental consciousness'],
    },
    riskLevel: 'Low',
    timeToBreakEven: 2,
    monthlyProfitRange: {
      min: 10000,
      max: 30000,
    },
  },
  startupToolkit: {
    businessPlan: {
      introduction: 'The liquid soap refilling business model focuses on providing quality cleaning products at affordable prices by eliminating packaging costs and leveraging bulk purchases.',
      marketNeed: 'Rising costs of branded cleaning products have created a market for cost-effective alternatives. Customers are increasingly seeking ways to reduce both expenses and plastic waste.',
      targetCustomer: 'Primary customers include budget-conscious households, small businesses, and institutions looking to reduce their cleaning supply expenses while maintaining quality.',
      startupCosts: [
        {
          id: '1',
          category: 'Equipment',
          item: '20L Storage containers',
          amount: 1200,
          isRequired: true,
        },
        {
          id: '2',
          category: 'Inventory',
          item: 'Initial soap stock (20L)',
          amount: 3000,
          isRequired: true,
        },
        {
          id: '3',
          category: 'Equipment',
          item: 'Measuring containers',
          amount: 500,
          isRequired: true,
        },
        {
          id: '4',
          category: 'Marketing',
          item: 'Posters and flyers',
          amount: 1000,
          isRequired: false,
        },
      ],
      revenueStreams: [
        'Direct soap refills to customers',
        'Bulk supply to small shops',
        'Home delivery service (additional fee)',
        'Empty container sales',
      ],
      operations: {
        daily: [
          'Check and record inventory levels',
          'Clean refilling station',
          'Process customer orders',
          'Update sales records',
        ],
        monthly: [
          'Bulk purchase of soap stock',
          'Equipment maintenance',
          'Financial review',
          'Marketing activities',
        ],
      },
    },
    suppliers: [
      {
        id: '1',
        name: 'Gikomba Wholesale Supplies',
        category: 'Raw Materials',
        contact: '+254700000000',
        location: 'Gikomba Market, Nairobi',
        items: ['Bulk liquid soap', 'Containers', 'Measuring equipment'],
      },
    ],
  },
  tracking: {
    sales: [],
    expenses: [],
    inventory: [
      {
        id: '1',
        name: 'Liquid Soap Stock',
        quantity: 20,
        unit: 'liters',
        reorderPoint: 5,
      },
      {
        id: '2',
        name: 'Empty Containers (1L)',
        quantity: 50,
        unit: 'pieces',
        reorderPoint: 10,
      },
    ],
  },
  growth: {
    monthlySnapshots: [],
    marketingTips: [
      {
        id: '1',
        platform: 'WhatsApp',
        title: 'Create a Business Catalog',
        description: 'Set up a professional WhatsApp Business profile with a product catalog to showcase your soap varieties and prices.',
        steps: [
          'Download WhatsApp Business app',
          'Set up business profile with logo and description',
          'Add products with clear images and prices',
          'Share catalog link with customers',
        ],
        estimatedCost: 0,
        estimatedTimeInHours: 2,
      },
      {
        id: '2',
        platform: 'Local Marketing',
        title: 'Door-to-Door Sample Distribution',
        description: 'Distribute small sample bottles to potential customers in your target area.',
        steps: [
          'Prepare 100ml sample bottles',
          'Print simple brochures with prices and contacts',
          'Map out target residential areas',
          'Conduct door-to-door distribution',
        ],
        estimatedCost: 2000,
        estimatedTimeInHours: 8,
      },
    ],
  },
}; 