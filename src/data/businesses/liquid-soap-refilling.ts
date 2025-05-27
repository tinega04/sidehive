import { Business } from '../../store/businessStore';

export const liquidSoapBusiness: Business = {
  id: 'liquid-soap',
  title: 'Liquid Soap Refilling Station',
  description:
    'Start a profitable eco-friendly business with minimal capital by setting up a liquid soap refilling station. This business model reduces plastic waste while providing essential products at competitive prices.',
  capitalRequired: {
    min: 25000,
    max: 50000,
  },
  monthlyProfit: {
    min: 15000,
    max: 45000,
  },
  industry: 'Retail',
  tags: ['eco-friendly', 'low-capital', 'high-demand', 'quick-start'],
  setupSteps: [
    'Research and identify reliable bulk soap suppliers',
    'Secure a suitable location with good foot traffic',
    'Purchase initial equipment (dispensers, containers, etc.)',
    'Set up proper storage and handling procedures',
    'Create pricing strategy and profit margins',
    'Design branding and signage',
    'Implement record-keeping system',
    'Market your service locally',
  ],
  pros: [
    'Low startup costs',
    'High profit margins',
    'Environmentally friendly',
    'Regular repeat customers',
    'Simple to operate',
    'Growing market demand',
  ],
  cons: [
    'Location dependent',
    'Competition from supermarkets',
    'Need consistent supplier',
    'Storage space required',
  ],
}; 