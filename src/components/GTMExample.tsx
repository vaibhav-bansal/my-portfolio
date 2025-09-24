// src/components/GTMExample.tsx
import { useGTM } from '../hooks/useGTM';

export const GTMExample = () => {
  const { trackEvent, trackPageView, gtmId, gtmAuth, gtmPreview, environment, isEnabled } = useGTM();

  const handleButtonClick = () => {
    trackEvent('button_click', {
      button_name: 'example_button',
      page_section: 'demo'
    });
  };

  const handlePageView = () => {
    trackPageView('/example', 'Example Page');
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">GTM Testing</h3>
      
      <div className="space-y-2 mb-4">
        <p><strong>GTM ID:</strong> {gtmId}</p>
        <p><strong>GTM Auth:</strong> {gtmAuth}</p>
        <p><strong>GTM Preview:</strong> {gtmPreview}</p>
        <p><strong>Environment:</strong> {environment}</p>
        <p><strong>Status:</strong> {isEnabled ? '✅ Enabled' : '❌ Disabled'}</p>
      </div>

      <div className="space-x-2">
        <button 
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Track Button Click
        </button>
        
        <button 
          onClick={handlePageView}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Track Page View
        </button>
      </div>
    </div>
  );
};
