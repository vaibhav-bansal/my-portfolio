import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import MakerProjects from "./pages/MakerProjects";
import ProjectDetail from "./pages/ProjectDetail";
import Writing from "./pages/Writing";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import { ConfigProvider } from "./contexts/ConfigContext";
import { GTM } from "./components/GTM";
import { useGTM } from "./hooks/useGTM";

const queryClient = new QueryClient();

const AppContent = () => {
  const { gtmId, gtmAuth, gtmPreview } = useGTM();
  
  return (
    <>
      <GTM gtmId={gtmId} gtmAuth={gtmAuth} gtmPreview={gtmPreview} />
      <ErrorBoundary>
        <ConfigProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="about" element={<About />} />
                    <Route path="work-projects" element={<CaseStudies />} />
                    <Route path="work-projects/:id" element={<CaseStudyDetail />} />
                    <Route path="side-projects" element={<MakerProjects />} />
                    <Route path="side-projects/:id" element={<ProjectDetail />} />
                    <Route path="writing" element={<Writing />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </ConfigProvider>
      </ErrorBoundary>
    </>
  );
};

const App = () => <AppContent />;

export default App;
