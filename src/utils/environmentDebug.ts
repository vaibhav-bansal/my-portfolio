// src/utils/environmentDebug.ts
export const debugEnvironment = () => {
  console.log('🔍 Environment Detection Debug:');
  console.log('PROD:', import.meta.env.PROD);
  console.log('DEV:', import.meta.env.DEV);
  console.log('MODE:', import.meta.env.MODE);
  console.log('NODE_ENV:', import.meta.env.NODE_ENV);
  
  // Show which GTM config will be used
  if (import.meta.env.PROD) {
    console.log('🚀 Using PRODUCTION GTM config:');
    console.log('  - Auth: INAh9lL1SUQlWn0ph6gjCg');
    console.log('  - Preview: env-1');
  } else {
    console.log('🛠️ Using DEVELOPMENT GTM config:');
    console.log('  - Auth: HthmeJdh63qRFdWrjogSiw');
    console.log('  - Preview: env-4');
  }
  
  return {
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
    mode: import.meta.env.MODE
  };
};
