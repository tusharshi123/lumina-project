import type { Skill, Project } from './types';

export const skills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', category: 'Frontend', proficiency: 'Expert' },
  { id: '2', name: 'Next.js', category: 'Frontend', proficiency: 'Expert' },
  { id: '3', name: 'TypeScript', category: 'Frontend', proficiency: 'Advanced' },
  { id: '4', name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Expert' },
  { id: '5', name: 'Vue.js', category: 'Frontend', proficiency: 'Advanced' },

  // Backend
  { id: '6', name: 'Node.js', category: 'Backend', proficiency: 'Expert' },
  { id: '7', name: 'PostgreSQL', category: 'Backend', proficiency: 'Advanced' },
  { id: '8', name: 'Python', category: 'Backend', proficiency: 'Advanced' },
  { id: '9', name: 'API Design', category: 'Backend', proficiency: 'Expert' },
  { id: '10', name: 'MongoDB', category: 'Backend', proficiency: 'Intermediate' },

  // Tools
  { id: '11', name: 'Git', category: 'Tools', proficiency: 'Expert' },
  { id: '12', name: 'Docker', category: 'Tools', proficiency: 'Advanced' },
  { id: '13', name: 'Figma', category: 'Tools', proficiency: 'Advanced' },
  { id: '14', name: 'AWS', category: 'Tools', proficiency: 'Intermediate' },
  { id: '15', name: 'CI/CD', category: 'Tools', proficiency: 'Advanced' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack marketplace with real-time inventory',
    longDescription: 'A comprehensive e-commerce platform built with Next.js and PostgreSQL featuring real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
    image: '/projects/ecommerce.jpg',
    category: 'Web',
    technologies: ['Next.js', 'React', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    year: 2024,
  },
  {
    id: '2',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard',
    longDescription: 'A powerful analytics dashboard that aggregates data from multiple sources and provides real-time insights with interactive charts and customizable widgets.',
    image: '/projects/analytics.jpg',
    category: 'Web',
    technologies: ['React', 'TypeScript', 'Recharts', 'Node.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    year: 2024,
  },
  {
    id: '3',
    title: 'Mobile Task Manager',
    description: 'Cross-platform task management app',
    longDescription: 'A mobile-first task management application with offline support, real-time sync, and collaboration features built with React Native.',
    image: '/projects/mobile.jpg',
    category: 'Mobile',
    technologies: ['React Native', 'Firebase', 'Redux'],
    year: 2023,
  },
  {
    id: '4',
    title: 'AI Content Generator',
    description: 'Machine learning powered content creation',
    longDescription: 'An intelligent content generation tool powered by advanced language models that helps users create high-quality content effortlessly.',
    image: '/projects/ai.jpg',
    category: 'Backend',
    technologies: ['Python', 'FastAPI', 'OpenAI', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    year: 2023,
  },
  {
    id: '5',
    title: 'Social Network',
    description: 'Decentralized social platform',
    longDescription: 'A modern social platform with real-time messaging, user profiles, and community features built on a scalable microservices architecture.',
    image: '/projects/social.jpg',
    category: 'Web',
    technologies: ['Next.js', 'WebSocket', 'MongoDB', 'Node.js'],
    liveUrl: 'https://example.com',
    year: 2023,
  },
  {
    id: '6',
    title: 'Design System',
    description: 'Comprehensive component library',
    longDescription: 'A comprehensive design system and component library featuring 50+ reusable components, accessibility best practices, and extensive documentation.',
    image: '/projects/design.jpg',
    category: 'Design',
    technologies: ['React', 'Storybook', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    year: 2023,
  },
];

export const experience = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'Tech Company Inc.',
    period: '2022 - Present',
    description: 'Leading development of core products and mentoring junior developers',
  },
  {
    role: 'Full-Stack Developer',
    company: 'Digital Agency Co.',
    period: '2020 - 2022',
    description: 'Built and maintained multiple web applications using modern tech stack',
  },
  {
    role: 'Frontend Developer',
    company: 'StartUp Studio',
    period: '2019 - 2020',
    description: 'Developed responsive user interfaces and improved UX performance',
  },
];

export const personalInfo = {
  name: 'Your Name',
  title: 'Full-Stack Developer',
  bio: 'Passionate about building beautiful and functional digital experiences. With expertise in modern web technologies, I help businesses transform their ideas into reality.',
  email: 'hello@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
  },
};
