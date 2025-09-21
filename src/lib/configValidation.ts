// Configuration validation utilities
// This helps ensure the portfolio.json config is properly structured

export interface CaseStudyContent {
  context?: string;
  problem?: string;
  process?: Array<{
    title: string;
    description: string;
    weeks: string;
  }>;
  artifacts?: string[];
  impactDetails?: string;
  reflection?: {
    whatWentWell?: string;
    whatIdDoDifferently?: string;
    keyTakeaway?: string;
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt?: string;
  tags: string[];
  duration: string;
  team: string;
  role?: string;
  impact: Record<string, string>;
  content?: CaseStudyContent;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    resumeLink: string;
    bio: string;
    yearsExperience: number;
    currentRole: string;
  };
  social: Record<string, string>;
  navigation: Array<{ name: string; href: string }>;
  skills: Record<string, string[]>;
  caseStudies: CaseStudy[];
  makerProjects: any[];
  writing: any[];
  resources: any[];
}

// Validation functions
export const validateCaseStudy = (study: any): study is CaseStudy => {
  return (
    study &&
    typeof study.id === 'string' &&
    typeof study.title === 'string' &&
    typeof study.subtitle === 'string' &&
    typeof study.description === 'string' &&
    typeof study.image === 'string' &&
    Array.isArray(study.tags) &&
    typeof study.duration === 'string' &&
    typeof study.team === 'string' &&
    typeof study.impact === 'object'
  );
};

export const validatePortfolioConfig = (config: any): config is PortfolioConfig => {
  return (
    config &&
    config.personal &&
    typeof config.personal.name === 'string' &&
    config.caseStudies &&
    Array.isArray(config.caseStudies) &&
    config.caseStudies.every(validateCaseStudy)
  );
};

// Helper function to safely access nested config properties
export const getConfigValue = <T>(config: any, path: string, fallback: T): T => {
  const keys = path.split('.');
  let value = config;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return fallback;
    }
  }
  
  return value as T;
};

// Error boundary fallback content
export const getFallbackContent = (type: string) => {
  const fallbacks = {
    caseStudy: {
      title: 'Case Study',
      description: 'This case study content is currently being updated.',
      impact: { status: 'Coming Soon' }
    },
    project: {
      title: 'Project',
      description: 'This project information is currently being updated.',
      stats: { status: 'Coming Soon' }
    },
    writing: {
      title: 'Article',
      excerpt: 'This article content is currently being updated.'
    }
  };
  
  return fallbacks[type as keyof typeof fallbacks] || fallbacks.caseStudy;
};
