// src/components/EnvironmentDebug.tsx
import { debugEnvironment } from '../utils/environmentDebug';

export const EnvironmentDebug = () => {
  const envInfo = debugEnvironment();
  
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Environment Detection</h3>
      
      <div className="space-y-2 text-sm">
        <p><strong>PROD:</strong> {envInfo.isProduction ? '✅ true' : '❌ false'}</p>
        <p><strong>DEV:</strong> {envInfo.isDevelopment ? '✅ true' : '❌ false'}</p>
        <p><strong>MODE:</strong> <code className="bg-gray-200 px-1 rounded">{envInfo.mode}</code></p>
        <p><strong>NODE_ENV:</strong> <code className="bg-gray-200 px-1 rounded">{import.meta.env.NODE_ENV}</code></p>
      </div>
      
      <div className="mt-4 p-2 bg-blue-100 rounded">
        <p className="text-sm">
          <strong>GTM Environment:</strong> {
            envInfo.isProduction ? '🚀 Production (env-1)' : '🛠️ Development (env-4)'
          }
        </p>
      </div>
    </div>
  );
};
