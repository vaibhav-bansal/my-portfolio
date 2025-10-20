import PageLayout from "@/components/PageLayout";
import { usePersonal, useFocusAreas } from "@/hooks/useSanity";
import DataError from "./DataError";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect } from "react";
import { trackPageView } from "@/lib/clarity";

const About = () => {
  const { data: personal, isLoading: personalLoading, error: personalError } = usePersonal();
  const { data: focusAreas, isLoading: focusAreasLoading, error: focusAreasError } = useFocusAreas();

  useEffect(() => {
    trackPageView('About');
  }, []);

  // Error state
  if (personalError || focusAreasError) {
    return <DataError />;
  }

  // Loading state
  if (personalLoading || focusAreasLoading) {
    return (
      <PageLayout>
        <div className="px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <LoadingSpinner size="lg" text="Loading your experience..." />
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="px-6 py-8">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Message */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
              {personal?.heroMessage || "Building Digital Experiences"}
            </h1>
          </div>

          {/* Professional Summary */}
          <div className="animate-fade-in mb-16" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {personal?.summary || "Passionate about creating meaningful digital products that solve real problems."}
            </p>
            
            {/* Resume Download Button */}
            {personal?.resume && (
              <div className="mt-8">
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#8B7355] hover:bg-[#A68B6B] text-white font-medium rounded-lg transition-colors duration-200 hover:shadow-lg"
                >
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  Download Resume
                </a>
              </div>
            )}
          </div>

          {/* Focus Areas */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {focusAreas?.map((area: any, index: number) => (
                <div
                  key={area._id}
                  className="p-6 rounded-xl bg-[#8B7355] border border-[#6B5B47] hover:border-[#A68B6B] transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {area.title}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              )) || []}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
