export type ExperienceItem = {
  title: string
  company: string
  location: string
  period: string
  bullets: readonly string[]
}

export const experience: readonly ExperienceItem[] = [
  {
    title: 'Software Development Engineer I',
    company: 'Zypp Electric',
    location: 'Gurugram',
    period: 'Sep 2026 – Present',
    bullets: [
      'Developed Spring Boot REST APIs and RBAC-based workflows for administrative operations, approvals and operational reporting.',
      "Contributed to backend modules across Zypp's internal ERP and operational systems, including workflow automation, API integrations and production issue resolution.",
      'Worked on backend changes and integrations across staging and production environments, supporting reliable releases and system stability.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Zypp Electric',
    location: 'Gurugram',
    period: 'Aug 2025 – Aug 2026',
    bullets: [
      'Developed and maintained production React.js applications across 8+ business-critical platforms (ERP Inventory, KYC, Finance, Visitor Management, SaaS, and customer-facing systems).',
      'Led website performance optimization (code splitting, lazy loading, WebP, deferred asset loading, build optimization, PWA improvements): Lighthouse ~30 → 93, FCP 1.8s → 0.6s, Speed Index 8.5s → 1.4s.',
      'Contributed to frontend architecture and scalability through reusable component systems, shared modules, state management patterns and monorepo-based development.',
      'Automated manual ERP and operational processes through backend APIs and new application modules.',
      'Contributed to marketplace and vendor workflows: product discovery, cart/order management, payment integrations, order tracking, reports and exchange-order flows.',
      'Integrated React apps with Spring Boot REST APIs; worked across auth/RBAC, data flows, production troubleshooting, code reviews and multi-environment releases.',
    ],
  },
]
