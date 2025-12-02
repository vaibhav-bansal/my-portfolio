import PageLayout from "@/components/PageLayout";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useSanity";
import DataError from "./DataError";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState, useRef } from "react";
import { trackPageView, trackEvent } from "@/lib/clarity";
import ProjectModal from "@/components/ProjectModal";
import { extractPlainText } from "@/lib/portableText";

// Component to handle description truncation - max 4 lines with ellipsis
const DescriptionWithEllipsis = ({ description }: { description: string }) => {
  return (
    <div 
      className="flex-1 min-h-0 overflow-hidden relative pr-16 sm:pr-20 w-full"
      style={{
        maxHeight: '6rem' // Exactly 4 lines: 4 * 1.5rem = 6rem
      }}
    >
      <p 
        className="text-white/80 text-xs sm:text-sm md:text-base w-full"
        style={{
          margin: 0,
          padding: 0,
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          lineHeight: '1.5rem',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: 0,
          maxHeight: '6rem', // Exactly 4 lines: 4 * 1.5rem = 6rem
          width: '100%'
        }}
      >
        {description}
      </p>
    </div>
  );
};

const Work = () => {
  const { data: projects, isLoading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const sortedProjects = projects ? [...projects]
    .filter((p: any) => p.order != null) // Only show projects with order (shouldn't happen if required, but safety check)
    .sort((a: any, b: any) => {
      // Primary sort: by order
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      // Secondary sort: by title (for same order values - shouldn't happen with uniqueness validation)
      return a.title.localeCompare(b.title);
    }) : [];

  useEffect(() => {
    trackPageView('Work');
  }, []);

  const handleReadMore = (e: React.MouseEvent, project: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(project);
    trackEvent('project_read_more', { 
      projectTitle: project.title 
    });
  };

  const handleArrowClick = (e: React.MouseEvent, project: any) => {
    e.stopPropagation();
    if (project.url) {
      trackEvent('project_clicked', { 
        projectTitle: project.title, 
        projectUrl: project.url,
        projectTags: project.tags 
      });
    }
  };

  // Error state
  if (error) {
    return <DataError />;
  }

  // Calculate grid layout based on project count
  const getGridClass = () => {
    const count = sortedProjects.length;
    if (count <= 2) {
      return "grid-cols-1 sm:grid-cols-2";
    }
    if (count <= 4) {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2";
    }
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  };

  const getTileHeight = () => {
    const count = sortedProjects.length;
    if (count <= 2) {
      return "h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)]";
    }
    if (count <= 4) {
      return "h-[28rem] sm:h-[32rem] md:h-[calc((100vh-14rem)/2)]";
    }
    return "h-[24rem] sm:h-[28rem] md:h-80 lg:h-96";
  };

  // Loading state
  if (isLoading) {
    return (
      <PageLayout>
        <div className="px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl text-center">
            <LoadingSpinner size="lg" text="Loading projects..." />
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={`px-4 sm:px-6 md:px-8 py-6 sm:py-8 ${sortedProjects.length > 12 ? 'overflow-y-auto' : ''}`}>
        <div className="container mx-auto max-w-7xl">
          <div className={`grid ${getGridClass()} gap-4 sm:gap-5 md:gap-6`}>
            {sortedProjects.map((project: any, index: number) => {
              // Dynamically show tags that fit in 2 lines
              // Tags will be positioned between title and subtitle
              const allTags = project.tags || [];
              
              // Smart heuristic: estimate how many tags fit based on typical lengths
              // Average tag is ~8-12 chars, with padding ~60-80px per tag
              // In 2 lines, we can fit approximately 4-6 tags depending on card width
              // Start conservative and show more if tags are short
              let visibleCount = allTags.length;
              
              if (allTags.length > 0) {
                // Estimate tag widths (rough calculation)
                const avgTagLength = allTags.reduce((sum: number, tag: string) => sum + tag.length, 0) / allTags.length;
                
                // If tags are long (>12 chars average), show fewer
                if (avgTagLength > 12 && allTags.length > 2) {
                  visibleCount = Math.min(2, allTags.length);
                } 
                // If tags are medium (8-12 chars), show up to 3-4
                else if (avgTagLength > 8 && allTags.length > 3) {
                  visibleCount = Math.min(3, allTags.length);
                }
                // If tags are short (<8 chars), show up to 4-5
                else if (allTags.length > 4) {
                  visibleCount = Math.min(4, allTags.length);
                }
                // Otherwise show all if 4 or fewer
              }
              
              const visibleTags = allTags.slice(0, visibleCount);
              const remainingCount = allTags.length - visibleCount;
              
              return (
                <div
                  key={project._id || project.id}
                  className={`group relative ${getTileHeight()} rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 active:scale-[0.98] animate-fade-in`}
                  style={{
                    backgroundColor: project.color,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 group-hover:from-black/30 group-hover:to-black/50 transition-all duration-300" />
                  
                  <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col text-white w-full">
                    {/* Header Section: Title, Tags, Subtitle - expands to full width */}
                    <div className="flex-shrink-0 mb-3 w-full">
                      <div className="flex items-start justify-between gap-2 sm:gap-3 w-full">
                        <div className="flex-1 min-w-0 w-full">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2 min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] line-clamp-2 w-full">
                            {project.title}
                          </h3>
                          
                          {/* Tags - positioned between title and subtitle, max 2 lines - full width */}
                          {allTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-1.5 sm:mb-2 w-full" style={{
                              maxHeight: '4.5rem',
                              overflow: 'hidden',
                              alignItems: 'flex-start'
                            }}>
                              {visibleTags.map((tag: string) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                  }}
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                  }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {remainingCount > 0 && (
                                <Badge
                                  variant="secondary"
                                  className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                  }}
                                >
                                  +{remainingCount} more
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium w-full">
                            {project.subtitle}
                          </p>
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleArrowClick(e, project)}
                            className="flex-shrink-0 p-1.5 sm:p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition-colors touch-manipulation flex items-center justify-center"
                            aria-label={`Open ${project.title} in new tab`}
                          >
                            <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Dynamic Description - max 4 lines with ellipsis, fills available space */}
                    <DescriptionWithEllipsis 
                      description={Array.isArray(project.description) 
                        ? extractPlainText(project.description)
                        : project.description || ''}
                    />
                    
                    {/* Read More Button - positioned at bottom right */}
                    <button
                      onClick={(e) => handleReadMore(e, project)}
                      className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 text-white/90 hover:text-white hover:underline active:text-white/80 text-xs sm:text-sm font-medium transition-colors duration-200 touch-manipulation z-10"
                      aria-label={`Read more about ${project.title}`}
                    >
                      Read more →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProject(null);
          }
        }}
      />
    </PageLayout>
  );
};

export default Work;
