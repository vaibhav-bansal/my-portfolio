import PageLayout from "@/components/PageLayout";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useSanity";
import DataError from "./DataError";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect } from "react";
import { trackPageView, trackEvent } from "@/lib/clarity";

const Work = () => {
  const { data: projects, isLoading, error } = useProjects();
  const sortedProjects = projects ? [...projects].sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) : [];

  useEffect(() => {
    trackPageView('Work');
  }, []);

  // Error state
  if (error) {
    return <DataError />;
  }

  // Calculate grid layout based on project count
  const getGridClass = () => {
    const count = sortedProjects.length;
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count <= 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  const getTileHeight = () => {
    const count = sortedProjects.length;
    if (count <= 2) return "h-[calc(100vh-12rem)]"; // Large tiles
    if (count <= 4) return "h-[calc((100vh-14rem)/2)]"; // Medium tiles
    return "h-80"; // Small tiles with scroll
  };

  // Loading state
  if (isLoading) {
    return (
      <PageLayout>
        <div className="px-6">
          <div className="container mx-auto max-w-7xl text-center">
            <LoadingSpinner size="lg" text="Loading projects..." />
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={`px-6 py-8 ${sortedProjects.length > 12 ? 'overflow-y-auto' : ''}`}>
        <div className="container mx-auto max-w-7xl">
          <div className={`grid ${getGridClass()} gap-6`}>
            {sortedProjects.map((project: any, index: number) => (
              <a
                key={project._id || project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('project_clicked', { 
                  projectTitle: project.title, 
                  projectUrl: project.url,
                  projectTags: project.tags 
                })}
                className={`group relative ${getTileHeight()} rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-fade-in`}
                style={{
                  backgroundColor: project.color,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 group-hover:from-black/30 group-hover:to-black/50 transition-all duration-300" />
                
                <div className="relative h-full p-8 flex flex-col justify-between text-white">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300">
                          {project.title}
                        </h3>
                        <p className="text-lg md:text-xl text-white/90 font-medium">
                          {project.subtitle}
                        </p>
                      </div>
                      <ExternalLink className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                    
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                      >
                        {tag}
                      </Badge>
                    )) || []}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Work;
