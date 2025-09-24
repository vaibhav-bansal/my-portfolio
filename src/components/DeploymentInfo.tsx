// src/components/DeploymentInfo.tsx
export const DeploymentInfo = () => {
  const isProduction = import.meta.env.PROD;
  const isDevelopment = import.meta.env.DEV;
  const mode = import.meta.env.MODE;
  
  // Detect deployment platform
  const getDeploymentPlatform = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      if (hostname.includes('netlify.app')) {
        return 'Netlify';
      } else if (hostname.includes('vercel.app')) {
        return 'Vercel';
      } else if (hostname.includes('github.io')) {
        return 'GitHub Pages';
      } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'Local Development';
      } else {
        return 'Custom Domain';
      }
    }
    return 'Unknown';
  };

  const platform = getDeploymentPlatform();
  
  return (
    <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-green-50">
      <h3 className="text-lg font-semibold mb-4">Deployment Information</h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p><strong>Platform:</strong> {platform}</p>
          <p><strong>Environment:</strong> {mode}</p>
          <p><strong>Build Mode:</strong> {isProduction ? 'Production' : 'Development'}</p>
        </div>
        
        <div>
          <p><strong>GTM Auth:</strong> 
            <code className="ml-1 bg-gray-200 px-1 rounded text-xs">
              {isProduction ? 'INAh9lL1SUQlWn0ph6gjCg' : 'HthmeJdh63qRFdWrjogSiw'}
            </code>
          </p>
          <p><strong>GTM Preview:</strong> 
            <code className="ml-1 bg-gray-200 px-1 rounded text-xs">
              {isProduction ? 'env-1' : 'env-4'}
            </code>
          </p>
          <p><strong>GTM Environment:</strong> 
            <span className={`ml-1 px-2 py-1 rounded text-xs ${
              isProduction ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isProduction ? 'Live' : 'Local'}
            </span>
          </p>
        </div>
      </div>
      
      {platform === 'Netlify' && (
        <div className="mt-4 p-2 bg-green-100 rounded">
          <p className="text-sm text-green-800">
            ✅ <strong>Netlify Deployment:</strong> Using production GTM configuration (env-1)
          </p>
        </div>
      )}
      
      {platform === 'Local Development' && (
        <div className="mt-4 p-2 bg-yellow-100 rounded">
          <p className="text-sm text-yellow-800">
            🛠️ <strong>Local Development:</strong> Using development GTM configuration (env-4)
          </p>
        </div>
      )}
    </div>
  );
};
