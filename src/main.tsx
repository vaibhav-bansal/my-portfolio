import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log('🚀 Main.tsx is loading...');
console.log('Root element:', document.getElementById("root"));

// Register service worker for caching and offline support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('❌ Root element not found!');
} else {
  console.log('✅ Root element found, creating React root...');
  const root = createRoot(rootElement);
  console.log('✅ React root created, rendering App...');
  root.render(<App />);
  console.log('✅ App rendered!');
}
