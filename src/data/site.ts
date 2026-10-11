export const site = {
  name: 'Harshit Shah',
  monogram: 'HS',
  role: 'Full-Stack Software Development Engineer',
  location: 'Gurugram, India',
  headline: 'Harshit Shah',
  tagline:
    'I build fast, reliable full-stack systems, from Spring Boot backends to buttery-smooth React frontends.',
  subline: 'Full-Stack Software Development Engineer · Gurugram, India',
  rotatingRoles: [
    'Full-Stack Engineer',
    'Spring Boot',
    'React',
    'Systems',
  ] as const,
  current: {
    label: 'Currently at Zypp Electric',
    company: 'Zypp Electric',
  },
  email: 'harshitshah159@gmail.com',
  phone: '+91 9456449770',
  phoneHref: 'tel:+919456449770',
  resumeHref: '/Harshit_Shah_Resume.pdf',
  // TODO: replace GitHub URL
  github: '#',
  // TODO: replace LinkedIn URL
  linkedin: '#',
  // TODO: replace with Formspree form id (https://formspree.io)
  formEndpoint: 'https://formspree.io/f/TODO',
  // TODO: replace with production domain
  canonicalUrl: 'https://harshitshah.dev',
  copyrightName: 'Harshit Shah',
} as const

export const about = {
  body: 'Full-stack Software Development Engineer with production experience at Zypp Electric, an EV fleet company. I work across ERP workflows, fleet operations, marketplace and order systems, authentication, payments, frontend architecture, performance optimization and production support.',
  facts: [
    { label: 'Based', value: 'Gurugram, India' },
    {
      label: 'Education',
      value: 'B.Tech in CSE, SRM University, Sonipat (2022–2026), CGPA 8.04/10',
    },
    { label: 'Currently', value: 'SDE I at Zypp Electric' },
    { label: 'Focus', value: 'Java / Spring Boot, React, system design' },
  ],
} as const
