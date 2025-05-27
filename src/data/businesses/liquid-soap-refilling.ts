import { BusinessIdea, Industry } from '../../types/types';

export const liquidSoapBusiness: BusinessIdea = {
  id: '1',
  title: 'Liquid Soap Refilling',
  description: 'Start a liquid soap refilling business with minimal capital. This business involves buying soap in bulk and repackaging it into smaller containers for retail sale.',
  industry: Industry.MANUFACTURING,
  startupCapital: {
    min: 5000,
    max: 15000,
  },
  monthlyProfit: {
    min: 10000,
    max: 30000,
  },
  tags: ['Low Risk', 'High Demand', 'Manufacturing'],
  popularity: 95,
}; 