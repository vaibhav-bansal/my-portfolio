import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PortfolioConfig } from '@/lib/configValidation';
import { client, queries } from '@/lib/sanity';

interface ConfigContextType {
  config: PortfolioConfig | null;
  loading: boolean;
  error: Error | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<PortfolioConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch portfolio data from Sanity
        const portfolioData = await client.fetch(queries.portfolio);
        
        if (!portfolioData) {
          // Fallback to JSON config if no Sanity data exists
          const { getConfig } = await import('@/lib/configLoader');
          const loadedConfig = await getConfig();
          setConfig(loadedConfig);
        } else {
          // Transform Sanity data to match PortfolioConfig structure
          const loadedConfig: PortfolioConfig = {
            personal: portfolioData.personal || {},
            seo: portfolioData.seo || {},
            social: portfolioData.social || {},
            navigation: portfolioData.navigation || [],
            skills: portfolioData.skills || {},
            caseStudies: portfolioData.caseStudies || [],
            makerProjects: portfolioData.makerProjects || [],
            writing: portfolioData.writing || [],
            resources: portfolioData.resources || [],
            assets: {
              fallbackImage: "/images/placeholder.svg",
              defaultImageAlt: "Portfolio image",
              loadingStates: {
                enabled: true,
                placeholder: "Loading..."
              }
            }
          };
          setConfig(loadedConfig);
        }
      } catch (err) {
        console.warn('Sanity fetch failed, falling back to JSON config:', err);
        try {
          // Fallback to JSON config on error
          const { getConfig } = await import('@/lib/configLoader');
          const loadedConfig = await getConfig();
          setConfig(loadedConfig);
        } catch (fallbackErr) {
          setError(fallbackErr instanceof Error ? fallbackErr : new Error('Failed to load configuration'));
        }
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, error }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
