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
  comingSoon?: boolean;
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
    domains: string[];
    metrics: {
      usersImpacted: string;
      arpuUplift: string;
    };
    background: {
      intro: string;
      philosophy: Record<string, {
        title: string;
        description: string;
      }>;
      highlights: {
        majorLaunches: string;
        sideProjects: string;
      };
    };
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
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
// NO FALLBACKS - throws error if property doesn't exist
export const getConfigValue = <T>(config: any, path: string): T => {
  const keys = path.split('.');
  let value = config;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      throw new Error(`CRITICAL ERROR: Required property '${path}' is missing from portfolio.json configuration. Please ensure this property exists in your configuration file.`);
    }
  }
  
  return value as T;
};
