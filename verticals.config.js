const verticals = [
  {
    name: 'Hotels',
    slug: 'hotels',
    noun: 'hotel',
    queries: [
      'Where should I stay in [city]?',
      'Best boutique hotel near me',
      'Luxury hotel with sea view',
    ],
    problems: [
      'Hotel positioning is unclear',
      'Website lacks structured content',
      'Unique selling points are not emphasized',
      'Listings are inconsistent across platforms',
    ],
    signals: [
      'Hotel type (luxury, boutique, business)',
      'Location context',
      'Target audience',
      'Amenities and experience',
    ],
  },
  {
    name: 'Healthcare Providers',
    slug: 'healthcare',
    noun: 'healthcare',
    queries: [
      'Best clinic near me',
      'Top dentist in [area]',
      'Which doctor should I choose?',
    ],
    problems: [
      'Services are not clearly structured',
      'Specializations are unclear',
      'Weak trust signals',
      'Inconsistent listings',
    ],
    signals: [
      'Specialization',
      'Location relevance',
      'Reputation',
      'Service clarity',
    ],
  },
  {
    name: 'Restaurants',
    slug: 'restaurants',
    noun: 'restaurant',
    queries: [
      'Best restaurant near me tonight',
      'Where should I eat in [area]?',
      'Top restaurant for a business dinner',
    ],
    problems: [
      'Cuisine and occasion fit are not clearly described',
      'Menu and experience signals are hard for AI to interpret',
      'Local listings are inconsistent',
      'Reviews and reputation signals are not connected to positioning',
    ],
    signals: [
      'Cuisine and dining style',
      'Location and neighborhood context',
      'Occasion fit',
      'Menu, atmosphere, and reputation',
    ],
  },
  {
    name: 'Professional Services',
    slug: 'professional-services',
    noun: 'professional services',
    queries: [
      'Best legal consultant near me',
      'Top accounting firm for small businesses',
      'Which service provider should I choose?',
    ],
    problems: [
      'Service categories are broad or unclear',
      'Expertise and credibility signals are underdeveloped',
      'Location and audience fit are not explicit',
      'Competitors have clearer positioning',
    ],
    signals: [
      'Service specialization',
      'Client type and use case',
      'Credentials and credibility',
      'Location and availability',
    ],
  },
  {
    name: 'Retail Businesses',
    slug: 'retail',
    noun: 'retail',
    queries: [
      'Where can I buy [product] near me?',
      'Best store for [category] in [city]',
      'Which local shop should I visit?',
    ],
    problems: [
      'Product categories are not structured clearly',
      'Store location and inventory signals are incomplete',
      'Online listings do not match the website',
      'Differentiators are not visible to AI systems',
    ],
    signals: [
      'Product category clarity',
      'Store location and service area',
      'Inventory and availability context',
      'Customer fit and reputation',
    ],
  },
  {
    name: 'Local Services',
    slug: 'local-services',
    noun: 'local service',
    queries: [
      'Best repair company near me',
      'Trusted salon in [area]',
      'Which local provider is available today?',
    ],
    problems: [
      'Service areas are not clear',
      'Availability and response signals are weak',
      'Trust indicators are fragmented',
      'Listings use inconsistent business descriptions',
    ],
    signals: [
      'Service area',
      'Service categories',
      'Availability and booking context',
      'Trust, reviews, and response quality',
    ],
  },
  {
    name: 'Real Estate',
    slug: 'real-estate',
    noun: 'real estate',
    queries: [
      'Best real estate agency in [city]',
      'Which property consultant should I choose?',
      'Top broker for luxury apartments near me',
    ],
    problems: [
      'Market specialization is not clear',
      'Property type expertise is not structured',
      'Agent and agency trust signals are inconsistent',
      'Neighborhood relevance is underdeveloped',
    ],
    signals: [
      'Property type specialization',
      'Neighborhood and city expertise',
      'Buyer, seller, or renter audience',
      'Track record and credibility',
    ],
  },
  {
    name: 'SaaS / B2B',
    slug: 'saas',
    noun: 'SaaS',
    queries: [
      'Best software for [use case]',
      'Which B2B platform should I choose?',
      'Top SaaS tool for [industry]',
    ],
    problems: [
      'Use cases are not mapped clearly',
      'Category positioning is too generic',
      'Feature and outcome signals are disconnected',
      'Comparison signals are weak or incomplete',
    ],
    signals: [
      'Software category',
      'Primary use cases',
      'Target customer profile',
      'Features, integrations, and outcomes',
    ],
  },
];

module.exports = verticals;
