export interface WorkProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  url: string;
  color: string;
  order: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    tagline: string;
    heroMessage: string;
  };
  experience: {
    summary: string;
    focusAreas: Array<{
      title: string;
      description: string;
    }>;
    stats: Array<{
      label: string;
      value: string;
    }>;
  };
  work: {
    projects: WorkProject[];
  };
  contact: {
    webhookUrl: string;
    socialLinks: SocialLink[];
  };
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Vaibhav",
    tagline: "Product Manager",
    heroMessage: "Hi, I am Vaibhav. I create products that users adopt. Here to build scalable and meaningful experiences.",
  },
  experience: {
    summary: "4 years in product development, with 2+ years leading high-impact product initiatives. Specializing in solving leverage problems that drive measurable business outcomes.",
    focusAreas: [
      {
        title: "Activation & Onboarding",
        description: "Reducing time-to-activation through intuitive, delightful onboarding experiences that convert users into engaged customers",
      },
      {
        title: "Revenue & Subscriptions",
        description: "Unlocking recurring revenue with thoughtful subscription models, billing flows, and payment experiences",
      },
      {
        title: "Developer Experience & AI",
        description: "Scaling adoption through API-first product design and applying AI to enhance automation and product decisioning",
      },
    ],
    stats: [
      {
        label: "Product Experience",
        value: "2+ Years",
      },
      {
        label: "Users Impacted",
        value: "~100k+",
      },
      {
        label: "Core Domains",
        value: "Payments, Subscriptions, Taxes",
      },
    ],
  },
  work: {
    projects: [
      {
        id: "project-1",
        title: "E-commerce Platform Redesign",
        subtitle: "Increased conversion by 45%",
        description: "Led complete UX overhaul of checkout experience for 2M+ monthly users",
        tags: ["UX Design", "A/B Testing", "Analytics"],
        url: "https://example.com/project-1",
        color: "hsl(200 70% 60%)",
        order: 1,
      },
      {
        id: "project-2",
        title: "AI-Powered Search",
        subtitle: "Reduced search time by 60%",
        description: "Shipped ML-driven search feature improving user satisfaction scores",
        tags: ["AI/ML", "Product Strategy", "User Research"],
        url: "https://example.com/project-2",
        color: "hsl(280 60% 65%)",
        order: 2,
      },
      {
        id: "project-3",
        title: "Mobile App Launch",
        subtitle: "100K downloads in first month",
        description: "0-to-1 product development for iOS and Android platforms",
        tags: ["Mobile", "Go-to-Market", "Cross-functional"],
        url: "https://example.com/project-3",
        color: "hsl(160 55% 55%)",
        order: 3,
      },
    ],
  },
  contact: {
    webhookUrl: "https://your-n8n-endpoint.com/webhook/contact",
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/yourprofile",
        icon: "linkedin",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/yourhandle",
        icon: "twitter",
      },
      {
        platform: "GitHub",
        url: "https://github.com/yourusername",
        icon: "github",
      },
      {
        platform: "Medium",
        url: "https://medium.com/@yourhandle",
        icon: "medium",
      },
    ],
  },
};
