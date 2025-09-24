import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PostHogProvider } from 'posthog-js/react'

// PostHog configuration with error handling
const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

const isPostHogConfigured = posthogKey && posthogHost && posthogKey !== 'your_posthog_project_key_here';

if (!isPostHogConfigured) {
  console.warn('⚠️ PostHog is not configured. Analytics will be disabled.');
  console.warn('To enable PostHog analytics:');
  console.warn('1. Create a .env.local file');
  console.warn('2. Add VITE_PUBLIC_POSTHOG_KEY and VITE_PUBLIC_POSTHOG_HOST');
  console.warn('3. Copy values from env.example file');
}

const options = {
  api_host: posthogHost || 'https://app.posthog.com',
  defaults: '2025-05-24',
  // Disable PostHog if not properly configured
  disabled: !isPostHogConfigured,
}

// Conditional PostHog provider
const AppWithAnalytics = isPostHogConfigured ? (
  <PostHogProvider apiKey={posthogKey} options={options}>
    <App />
  </PostHogProvider>
) : (
  <App />
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {AppWithAnalytics}
  </StrictMode>,
);
