export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
}

export interface PageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    content: string;
    experience: Array<{
      role: string;
      company: string;
      period: string;
    }>;
  };
}

export const PROJECT_CATEGORIES = [
  'Branding',
  'Campaign',
  'Social Media',
  'Branded Content',
  'Activation'
] as const;
