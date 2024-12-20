import { Project, PageContent } from '../types';

const PROJECTS_KEY = 'portfolio_projects';
const CONTENT_KEY = 'portfolio_content';

const defaultContent: PageContent = {
  hero: {
    title: "Creating Meaningful Brand Stories",
    subtitle: "Creative Director with 15+ years in advertising"
  },
  about: {
    intro: [
      "Creative Art Director and Designer working in major agencies in São Paulo for over 10 years. I've worked with clients from different markets in digital, social and traditional media, demonstrating what I believe to be good advertising – focused on human benefit and the growth of society as a community.",
      "I started my career coding and designing websites. Then, directed my focus on art direction, creating and developing ideas that were relevant to people and brought significant results to clients."
    ],
    highlights: [
      "Created Amazon's launching campaign in Brazil",
      "Introduced QR Codes in TV merchandising actions (+160% download of Americanas app)",
      "Collaborated in the winning pitch for L'Óreal's digital account",
      "6 years creating campaigns and content for Mastercard"
    ],
    experience: [
      {
        role: "Creative Director",
        company: "Agência Crush",
        period: "Ago 2022 – Present"
      },
      {
        role: "Art Director",
        company: "Tech and Soul",
        period: "Jun 2020 – Ago 2022"
      },
      {
        role: "Art Director",
        company: "WMcCann",
        period: "Feb 2014 – Jun 2020"
      },
      {
        role: "Art Director",
        company: "OFF Publicidade e Propaganda",
        period: "May 2013 – Feb 2014"
      },
      {
        role: "Art Director",
        company: "Multisolution",
        period: "Sep 2010 – Apr 2013"
      },
      {
        role: "Digital Intern",
        company: "141 SoHo Square",
        period: "Aug 2009 – Sep 2010"
      }
    ],
    skills: [
      "Advertising",
      "Creative Direction",
      "Art Direction",
      "Graphic Design",
      "Digital Design",
      "Web Design",
      "Interaction Design",
      "Corporate Identity",
      "Branded Content",
      "Creative Strategy",
      "Brand Development",
      "Production Direction",
      "Digital Media"
    ],
    clients: [
      "Mastercard",
      "Amazon",
      "Prime Video",
      "Mitsubishi Motors",
      "Americanas.com",
      "Pizza Hut",
      "Deca",
      "L'Óreal",
      "Nesfit",
      "FNAC",
      "FoxSony Films",
      "Cervejaria Petrópolis (Itaipava, Crystal, TNT, Blue Spirit)",
      "Avon",
      "Vipal",
      "Abril Coleções",
      "Barbacoa"
    ],
    awards: [
      {
        project: "Mastercard Priceless Rio",
        items: [
          "Effie Awards Brasil Gold in Financial Services",
          "Effie Awards Brasil Bronze in Olympics Specials",
          "New York Festivals Midas Awards Silver Midas"
        ]
      },
      {
        project: "Mastercard Surpreenda",
        items: [
          "Effie Awards Brasil Bronze in Financial Services",
          "Effie Awards Latam Shortlist"
        ]
      }
    ]
  }
};

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Global Tech Brand Launch',
    description: `Led the creative direction for a major tech brand launch across 20 markets. The campaign included digital, social, and traditional media components, reaching over 100 million people worldwide.

Our team developed a cohesive visual language that translated across cultures while maintaining the brand's core message. The launch resulted in a 200% increase in brand awareness and a significant boost in market share.

Key achievements:
- Developed innovative cross-platform storytelling approach
- Coordinated with 15 regional creative teams
- Achieved 95% positive sentiment in social media response
- Won multiple industry awards including Cannes Lions`,
    imageUrl: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&q=80',
    gallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80'
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ],
    year: '2023',
    client: 'Tech Co',
    categories: ['Branding', 'Campaign']
  },
  {
    id: '2',
    title: 'Sustainable Fashion Campaign',
    description: 'Developed an awareness campaign highlighting sustainable practices in the fashion industry.',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80',
    gallery: [],
    year: '2023',
    client: 'EcoStyle',
    categories: ['Campaign', 'Social Media']
  }
];

function getInitialData<T>(key: string, defaultData: T): T {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(stored);
}

export const storage = {
  getProjects: (): Project[] => {
    return getInitialData(PROJECTS_KEY, defaultProjects);
  },
  
  saveProjects: (projects: Project[]) => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  },

  getContent: (): PageContent => {
    return getInitialData(CONTENT_KEY, defaultContent);
  },

  saveContent: (content: PageContent) => {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  }
};
