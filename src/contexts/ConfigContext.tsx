import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PortfolioConfig } from '@/lib/configValidation';
import { getConfig } from '@/lib/configLoader';

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
        const loadedConfig = await getConfig();
        setConfig(loadedConfig);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load configuration'));
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
