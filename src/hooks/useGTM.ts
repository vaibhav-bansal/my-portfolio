// src/hooks/useGTM.ts - Enhanced version with environment variable support
import { useMemo } from 'react';

export const useGTM = () => {
  const gtmConfig = useMemo(() => {
    // Determine environment
    const isProduction = import.meta.env.PROD;
    const isDevelopment = import.meta.env.DEV;
    
    // GTM ID is the same for both environments
    const gtmId = 'GTM-PBNPNMFW';
    
    // Environment-specific parameters
    let gtmAuth: string;
    let gtmPreview: string;
    
    if (isProduction) {
      // Production environment - check for environment variables first
      gtmAuth = import.meta.env.VITE_PUBLIC_GTM_AUTH_LIVE || 'INAh9lL1SUQlWn0ph6gjCg';
      gtmPreview = import.meta.env.VITE_PUBLIC_GTM_PREVIEW_LIVE || 'env-1';
    } else {
      // Development environment - check for environment variables first
      gtmAuth = import.meta.env.VITE_PUBLIC_GTM_AUTH_LOCAL || 'HthmeJdh63qRFdWrjogSiw';
      gtmPreview = import.meta.env.VITE_PUBLIC_GTM_PREVIEW_LOCAL || 'env-4';
    }
    
    return {
      gtmId,
      gtmAuth,
      gtmPreview,
      environment: isProduction ? 'production' : 'development',
      platform: typeof window !== 'undefined' ? 
        (window.location.hostname.includes('netlify.app') ? 'netlify' : 'other') : 'unknown'
    };
  }, []);

  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters,
        timestamp: new Date().toISOString(),
        page_path: window.location.pathname,
        page_title: document.title,
        deployment_platform: gtmConfig.platform,
        environment: gtmConfig.environment
      });
    }
  };

  const trackPageView = (pagePath: string, pageTitle: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: pagePath,
        page_title: pageTitle,
        timestamp: new Date().toISOString(),
        deployment_platform: gtmConfig.platform,
        environment: gtmConfig.environment
      });
    }
  };

  return {
    ...gtmConfig,
    trackEvent,
    trackPageView,
    isEnabled: !!gtmConfig.gtmId
  };
};