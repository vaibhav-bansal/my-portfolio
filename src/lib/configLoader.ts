// Configuration loader with proper error handling
// No fallbacks - errors when portfolio.json is missing or invalid

import { PortfolioConfig } from './configValidation';

let config: PortfolioConfig | null = null;
let configError: Error | null = null;

// Load configuration with error handling
export const loadConfig = async (): Promise<PortfolioConfig> => {
  if (config) {
    return config;
  }

  if (configError) {
    throw configError;
  }

  try {
    // Import the JSON file - this will throw if missing or invalid
    const configModule = await import('@/config/portfolio.json');
    
    if (!configModule || typeof configModule !== 'object') {
      throw new Error('portfolio.json is not a valid JSON object');
    }

    config = configModule.default as PortfolioConfig;
    return config;
  } catch (error) {
    configError = error instanceof Error ? error : new Error('Failed to load portfolio.json');
    
    // Provide detailed error messages based on the error type
    if (configError.message.includes('Cannot resolve module')) {
      throw new Error('CRITICAL ERROR: portfolio.json file is missing. Please ensure src/config/portfolio.json exists and contains valid portfolio data.');
    }
    
    if (configError.message.includes('JSON')) {
      throw new Error('CRITICAL ERROR: portfolio.json contains invalid JSON syntax. Please fix the JSON syntax errors.');
    }
    
    throw configError;
  }
};

// Get configuration with validation
export const getConfig = async (): Promise<PortfolioConfig> => {
  const loadedConfig = await loadConfig();
  
  // Validate the configuration structure
  if (!loadedConfig.personal || !loadedConfig.personal.name) {
    throw new Error('CRITICAL ERROR: portfolio.json is missing required personal information (name, title, etc.). Please ensure all required fields are present.');
  }
  
  if (!Array.isArray(loadedConfig.caseStudies)) {
    throw new Error('CRITICAL ERROR: portfolio.json is missing or has invalid caseStudies array. Please ensure caseStudies is an array.');
  }
  
  if (!Array.isArray(loadedConfig.makerProjects)) {
    throw new Error('CRITICAL ERROR: portfolio.json is missing or has invalid makerProjects array. Please ensure makerProjects is an array.');
  }
  
  if (!Array.isArray(loadedConfig.writing)) {
    throw new Error('CRITICAL ERROR: portfolio.json is missing or has invalid writing array. Please ensure writing is an array.');
  }
  
  if (!Array.isArray(loadedConfig.resources)) {
    throw new Error('CRITICAL ERROR: portfolio.json is missing or has invalid resources array. Please ensure resources is an array.');
  }
  
  return loadedConfig;
};

// Reset configuration (for testing purposes)
export const resetConfig = () => {
  config = null;
  configError = null;
};
