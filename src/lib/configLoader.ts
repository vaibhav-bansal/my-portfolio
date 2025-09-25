// Configuration loader with proper error handling
// No fallbacks - errors when portfolio.jsonc is missing or invalid

import { PortfolioConfig } from './configValidation';
import { parse } from 'jsonc-parser';

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
    // Import the JSONC file - this will throw if missing or invalid
    const configModule = await import('@/config/portfolio.jsonc?raw');
    
    if (!configModule || typeof configModule.default !== 'string') {
      throw new Error('portfolio.jsonc is not a valid file');
    }

    // Parse JSONC content
    const parsedConfig = parse(configModule.default);
    if (!parsedConfig) {
      throw new Error('portfolio.jsonc contains invalid JSONC syntax');
    }

    config = parsedConfig as PortfolioConfig;
    return config;
  } catch (error) {
    configError = error instanceof Error ? error : new Error('Failed to load portfolio.jsonc');
    
    // Provide detailed error messages based on the error type
    if (configError.message.includes('Cannot resolve module')) {
      throw new Error('CRITICAL ERROR: portfolio.jsonc file is missing. Please ensure src/config/portfolio.jsonc exists and contains valid portfolio data.');
    }
    
    if (configError.message.includes('JSONC') || configError.message.includes('JSON')) {
      throw new Error('CRITICAL ERROR: portfolio.jsonc contains invalid JSONC syntax. Please fix the JSONC syntax errors.');
    }
    
    throw configError;
  }
};

// Get configuration with validation
export const getConfig = async (): Promise<PortfolioConfig> => {
  const loadedConfig = await loadConfig();
  
  // Validate the configuration structure
  if (!loadedConfig.personal || !loadedConfig.personal.name) {
    throw new Error('CRITICAL ERROR: portfolio.jsonc is missing required personal information (name, title, etc.). Please ensure all required fields are present.');
  }
  
  if (!Array.isArray(loadedConfig.caseStudies)) {
    throw new Error('CRITICAL ERROR: portfolio.jsonc is missing or has invalid caseStudies array. Please ensure caseStudies is an array.');
  }
  
  if (!Array.isArray(loadedConfig.makerProjects)) {
    throw new Error('CRITICAL ERROR: portfolio.jsonc is missing or has invalid makerProjects array. Please ensure makerProjects is an array.');
  }
  
  if (!Array.isArray(loadedConfig.writing)) {
    throw new Error('CRITICAL ERROR: portfolio.jsonc is missing or has invalid writing array. Please ensure writing is an array.');
  }
  
  if (!Array.isArray(loadedConfig.resources)) {
    throw new Error('CRITICAL ERROR: portfolio.jsonc is missing or has invalid resources array. Please ensure resources is an array.');
  }
  
  return loadedConfig;
};

// Reset configuration (for testing purposes)
export const resetConfig = () => {
  config = null;
  configError = null;
};

// Synchronous version for tests (assumes config is already loaded)
export const getConfigSync = (): PortfolioConfig => {
  if (!config) {
    throw new Error('Configuration not loaded. Call loadConfig() first.');
  }
  return config;
};