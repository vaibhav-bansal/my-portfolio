import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Suspense, lazy } from "react";
import { initializeClarity } from "./lib/clarity";
import ErrorBoundary from "./components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { useSanityConnectionTest } from "./hooks/useSanity";

// Lazy load pages for better performance
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (renamed from cacheTime in newer versions)
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse">
      <div className="h-16 bg-gray-200 rounded mb-6 w-64"></div>
      <div className="h-6 bg-gray-200 rounded mb-12 w-96"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl bg-gray-200 h-32"></div>
        ))}
      </div>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    initializeClarity();
  }, []);

  // Debug Sanity connection in development
  const { data: sanityTest } = useSanityConnectionTest();
  
  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('🔧 Sanity Connection Test Result:', sanityTest);
    }
  }, [sanityTest]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/contact" element={<Contact />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Analytics />
          <SpeedInsights />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
