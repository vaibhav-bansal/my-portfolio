import posthog from 'posthog-js';

// PostHog configuration from environment variables
// Note: Vite only exposes variables prefixed with VITE_ to the client
const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_KEY || '';
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

// Initialize PostHog
export const initializePostHog = () => {
  if (typeof window !== 'undefined') {
    // Don't initialize if API key is missing
    if (!POSTHOG_API_KEY) {
      if (import.meta.env.DEV) {
        console.warn('PostHog API key is missing. Please set VITE_POSTHOG_KEY in your .env.local file.');
      }
      return;
    }

    posthog.init(POSTHOG_API_KEY, {
      api_host: POSTHOG_HOST,
      loaded: (posthog) => {
        if (import.meta.env.DEV) {
          console.log('PostHog initialized');
          posthog.debug();
        }
      },
      // Enable session replay
      session_recording: {
        recordCrossOriginIframes: false,
        maskAllInputs: true, // Mask sensitive input fields
        maskInputOptions: {
          password: true,
          email: true,
          // Mask phone numbers but allow other fields
        },
      },
      // Capture pageviews automatically
      capture_pageview: true,
      // Capture pageleave automatically
      capture_pageleave: true,
      // Enable autocapture for clicks, form submissions, etc.
      autocapture: true,
      // Persistence config
      persistence: 'localStorage+cookie',
      // Additional config
      cross_subdomain_cookie: false,
      secure_cookie: true,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};

// Track page views
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture('$pageview', {
      page_name: pageName,
      ...properties,
    });
  }
};

// Identify user (when user provides info, e.g., via contact form)
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties);
  }
};

// Reset user session (on logout)
export const resetUser = () => {
  if (typeof window !== 'undefined') {
    posthog.reset();
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.setPersonProperties(properties);
  }
};

export default posthog;
