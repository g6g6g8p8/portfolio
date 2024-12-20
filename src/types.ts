export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gallery: {
    type: 'image' | 'video';
    url: string;
  }[];
  year: string;
  client: string;
  categories: string[];
}

export interface PageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    intro: string[];
    highlights: string[];
    experience: {
      role: string;
      company: string;
      period: string;
    }[];
    skills: string[];
    clients: string[];
    awards: {
      project: string;
      items: string[];
    }[];
  };
}

export const PROJECT_CATEGORIES = [
  'Branding',
  'Campaign',
  'Social Media',
  'Branded Content',
  'Activation'
] as const;
