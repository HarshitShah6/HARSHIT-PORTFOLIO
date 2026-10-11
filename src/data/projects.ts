export const tiffinProject = {
  title: 'Tiffin Management Platform',
  stack: ['Spring Boot', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'] as const,
  summary:
    'A subscription-based food delivery platform for Customers, Vendors and Admins.',
  highlights: [
    'JWT authentication and role-based authorization with Spring Security',
    'Automated daily order generation for active subscriptions using scheduled jobs',
    'Redis caching and performance optimization for scalability and response times',
    'Event-driven order processing and notifications via Kafka',
    'Dockerized services, APIs documented with Swagger/OpenAPI',
  ],
  architecture: [
    'Client',
    'API',
    'Spring Security',
    'Services',
    'PostgreSQL',
    'Redis',
    'Kafka',
    'Notifications',
  ] as const,
}

export const productionWork = [
  {
    title: 'ERP Inventory',
    line: 'Production React workflows for inventory operations inside Zypp’s internal ERP.',
  },
  {
    title: 'KYC',
    line: 'Business-critical identity and verification surfaces maintained in production.',
  },
  {
    title: 'Finance',
    line: 'Finance-facing React modules shipped as part of the internal platform suite.',
  },
  {
    title: 'Visitor Management',
    line: 'Operational visitor-management application among 8+ production platforms.',
  },
  {
    title: 'Marketplace / Vendor dashboard',
    line: 'Product discovery, cart and orders, payments, tracking, reports and exchange flows.',
  },
  {
    title: 'Performance Optimization',
    line: 'Lighthouse 30 → 93, FCP 1.8s → 0.6s, Speed Index 8.5s → 1.4s via splitting, WebP and PWA work.',
  },
] as const
