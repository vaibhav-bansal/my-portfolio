// Performance monitoring utilities
export const performanceMonitor = {
  // Measure page load time
  measurePageLoad: (pageName: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      console.log(`🚀 ${pageName} loaded in ${loadTime.toFixed(2)}ms`);
      
      // Send to analytics if available
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          page_name: pageName,
          load_time: Math.round(loadTime),
        });
      }
    }
  },

  // Measure API response time
  measureApiCall: async <T>(
    apiCall: () => Promise<T>,
    callName: string
  ): Promise<T> => {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log(`📡 ${callName} completed in ${duration.toFixed(2)}ms`);
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.error(`❌ ${callName} failed after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  },

  // Check if user is on slow connection
  isSlowConnection: (): boolean => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
    }
    return false;
  },

  // Preload critical resources
  preloadResource: (url: string, type: 'image' | 'script' | 'style' = 'image') => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = type;
      document.head.appendChild(link);
    }
  },
};

// Web Vitals monitoring
export const reportWebVitals = (metric: any) => {
  console.log('Web Vital:', metric);
  
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_delta: Math.round(metric.delta),
    });
  }
};

export default performanceMonitor;
