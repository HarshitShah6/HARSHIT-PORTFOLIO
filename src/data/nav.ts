export const navLinks = [
  { href: '#about', label: 'About', id: 'about' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#impact', label: 'Impact', id: 'impact' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#contact', label: 'Contact', id: 'contact' },
] as const

export type SectionId = (typeof navLinks)[number]['id']
