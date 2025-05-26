import { BusinessIdea, Industry, CapitalTier } from '../types/types';

export const businessIdeas: BusinessIdea[] = [
  // Retail - Low Capital
  {
    id: 'retail-1',
    title: 'Mobile Fruit Stand',
    description: 'Sell fruits from a pushcart or wheelbarrow in high foot-traffic areas.',
    industry: Industry.Retail,
    capitalRequired: CapitalTier.Low,
    estimatedStartupCost: 'Ksh 3,000',
    toolsNeeded: [
      'Wheelbarrow or pushcart',
      'Initial fruit stock',
      'Weighing scale',
      'Plastic bags',
      'Calculator'
    ],
    setupProcess: [
      'Purchase or rent a cart/wheelbarrow',
      'Source fruits from wholesale market',
      'Scout high-traffic locations',
      'Get necessary local permits',
      'Set up pricing strategy'
    ],
    revenueStreams: [
      'Direct fruit sales',
      'Bulk orders for events',
      'Regular customer subscriptions'
    ],
    challenges: [
      'Weather dependency',
      'Perishable inventory',
      'Competition from other vendors',
      'Storage issues'
    ],
    idealLocations: [
      'Busy street corners',
      'Bus stops',
      'Near offices',
      'School zones'
    ],
    successTips: [
      'Build relationships with wholesale suppliers',
      'Keep fruits fresh and well-displayed',
      'Maintain consistent quality',
      'Offer competitive prices'
    ],
    monthlyIncomeRange: 'Ksh 15,000 - 45,000',
    timeCommitment: '8-12 hours daily',
    realLifeExamples: [
      'John in Westlands makes Ksh 1,500 daily selling fruits near offices',
      'Mary started with one cart in Kasarani and now owns three locations'
    ]
  },
  {
    id: 'retail-2',
    title: 'Mitumba Clothes Resale',
    description: 'Buy and resell quality second-hand clothes from Gikomba market.',
    industry: Industry.Retail,
    capitalRequired: CapitalTier.Low,
    estimatedStartupCost: 'Ksh 8,000',
    toolsNeeded: [
      'Smartphone for photos/marketing',
      'Storage bags/hangers',
      'Measuring tape',
      'Iron for pressing',
      'Transport bag'
    ],
    setupProcess: [
      'Source quality mitumba bales from Gikomba',
      'Sort and grade clothes',
      'Take good photos',
      'Set up social media accounts',
      'Price items competitively'
    ],
    revenueStreams: [
      'Individual piece sales',
      'Bulk sales to other resellers',
      'Online orders via WhatsApp/Instagram'
    ],
    challenges: [
      'Quality inconsistency in bales',
      'Storage space limitations',
      'Market competition',
      'Weather damage risk'
    ],
    idealLocations: [
      'Online platforms',
      'Estate grounds',
      'Local markets',
      'Campus areas'
    ],
    successTips: [
      'Focus on trendy, in-demand items',
      'Build a strong social media presence',
      'Maintain good supplier relationships',
      'Offer home delivery options'
    ],
    monthlyIncomeRange: 'Ksh 30,000 - 90,000',
    timeCommitment: 'Flexible, 4-8 hours daily',
    realLifeExamples: [
      'Sarah started with Ksh 5,000 and now runs a successful Instagram thrift store',
      'James specializes in official wear and makes Ksh 3,000 daily'
    ]
  },
  // Medium Capital
  {
    id: 'retail-3',
    title: 'Cosmetics Kiosk',
    description: 'Sell fast-moving beauty products in a strategic location near salons or schools.',
    industry: Industry.Retail,
    capitalRequired: CapitalTier.Medium,
    estimatedStartupCost: 'Ksh 40,000',
    toolsNeeded: [
      'Display shelves',
      'Glass counter',
      'Initial stock',
      'Security measures',
      'Record keeping materials'
    ],
    setupProcess: [
      'Secure a good location',
      'Source products from wholesale suppliers',
      'Set up attractive displays',
      'Create inventory system',
      'Establish supplier relationships'
    ],
    revenueStreams: [
      'Retail sales',
      'Bulk sales to salons',
      'Special orders',
      'Product recommendations'
    ],
    challenges: [
      'Product authenticity verification',
      'Price competition',
      'Stock management',
      'Changing beauty trends'
    ],
    idealLocations: [
      'Near salons',
      'Shopping centers',
      'Campus areas',
      'Busy estates'
    ],
    successTips: [
      'Stay updated on beauty trends',
      'Build relationships with salon owners',
      'Offer product testing',
      'Keep popular items in stock'
    ],
    monthlyIncomeRange: 'Ksh 60,000 - 150,000',
    timeCommitment: '10-12 hours daily',
    realLifeExamples: [
      'Jane\'s kiosk near Kenyatta University serves over 50 customers daily',
      'Peter supplies products to 5 local salons regularly'
    ]
  },
  // High Capital
  {
    id: 'retail-4',
    title: 'Mini Supermarket',
    description: 'Open a small-scale supermarket in a densely populated estate.',
    industry: Industry.Retail,
    capitalRequired: CapitalTier.High,
    estimatedStartupCost: 'Ksh 400,000',
    toolsNeeded: [
      'Shop space',
      'Shelving and displays',
      'Refrigeration units',
      'POS system',
      'Security system',
      'Initial inventory'
    ],
    setupProcess: [
      'Secure and renovate shop space',
      'Obtain necessary licenses',
      'Install fixtures and equipment',
      'Source products from distributors',
      'Hire and train staff',
      'Set up inventory system'
    ],
    revenueStreams: [
      'Retail sales',
      'Bulk orders',
      'Mobile money services',
      'Product deliveries'
    ],
    challenges: [
      'High initial investment',
      'Stock management',
      'Staff supervision',
      'Competition from larger stores',
      'Perishable goods management'
    ],
    idealLocations: [
      'Residential estates',
      'Near apartment complexes',
      'Growing neighborhoods',
      'Areas with limited competition'
    ],
    successTips: [
      'Focus on fast-moving items',
      'Maintain competitive prices',
      'Offer excellent customer service',
      'Keep the store clean and organized',
      'Implement proper accounting systems'
    ],
    monthlyIncomeRange: 'Ksh 240,000 - 450,000',
    timeCommitment: '14-16 hours daily',
    realLifeExamples: [
      'David\'s shop in Kahawa West serves over 200 customers daily',
      'Margaret expanded from one to three locations in 2 years'
    ]
  }
]; 