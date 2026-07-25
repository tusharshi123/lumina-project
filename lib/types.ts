export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Other';
  proficiency: 'Expert' | 'Advanced' | 'Intermediate';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: 'Web' | 'Mobile' | 'Backend' | 'Design';
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
