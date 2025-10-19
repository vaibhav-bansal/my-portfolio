// Initialize Microsoft Clarity
export const initializeClarity = () => {
  if (typeof window !== 'undefined') {
    // Load Clarity script
    const script = document.createElement('script');
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "tso4sen66u");
    `;
    document.head.appendChild(script);
  }
}

// Track custom events
export const trackEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('event', eventName, data);
  }
}

// Track page views
export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', 'page', pageName);
  }
}
