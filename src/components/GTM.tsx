// src/components/GTM.tsx
import { useEffect } from 'react';

interface GTMProps {
  gtmId: string;
  gtmAuth: string;
  gtmPreview: string;
}

export const GTM = ({ gtmId, gtmAuth, gtmPreview }: GTMProps) => {
  useEffect(() => {
    // Only load GTM in browser environment
    if (typeof window !== 'undefined' && gtmId) {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      
      // GTM script with environment parameters
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl+'&gtm_auth=${gtmAuth}&gtm_preview=${gtmPreview}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      
      // Insert script in head
      document.head.appendChild(script);
      
      // Cleanup function
      return () => {
        // Remove GTM script on unmount
        const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`);
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [gtmId, gtmAuth, gtmPreview]);

  // Return noscript fallback
  if (!gtmId) return null;
  
  return (
    <noscript>
      <iframe 
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}&gtm_auth=${gtmAuth}&gtm_preview=${gtmPreview}&gtm_cookies_win=x`}
        height="0" 
        width="0" 
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
};

// Declare dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
