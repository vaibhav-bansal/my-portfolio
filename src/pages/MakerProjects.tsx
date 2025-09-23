import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ComingSoonCard from "@/components/ComingSoonCard";
import { useConfig } from "@/contexts/ConfigContext";

const MakerProjects = () => {
  const { config: portfolioConfig, loading, error } = useConfig();
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text mb-4">Loading...</div>
          <div className="text-muted-foreground">Loading portfolio configuration</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !portfolioConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500 mb-4">Configuration Error</div>
          <div className="text-muted-foreground">Failed to load portfolio configuration</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Maker Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Personal projects where I explore new ideas, experiment with emerging technologies, 
              and solve problems I'm passionate about. Each project showcases different aspects 
              of product thinking and technical execution.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {portfolioConfig.makerProjects.map((project) => {
              // Show coming soon card if marked as coming soon
              if (project.comingSoon) {
                return (
                  <ComingSoonCard
                    key={project.id}
                    className="min-h-[400px]"
                  />
                );
              }

              return (
              <Card key={project.id} className="card-hover overflow-hidden">
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="aspect-video bg-gradient-card flex items-center justify-center">
                    <div className="text-muted-foreground text-lg font-medium">
                      {project.title} Preview
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          {project.title}
                        </h2>
                        <p className="text-muted-foreground font-medium">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {project.github && (
                          <Button variant="ghost" size="sm" asChild>
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              aria-label="View GitHub repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.website && (
                          <Button variant="ghost" size="sm" asChild>
                            <a 
                              href={project.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              aria-label="Visit project website"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-primary mb-1">
                            {value}
                          </div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/maker-projects/${project.id}`}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>

          {/* Skills & Approach */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              My Maker Approach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Problem-First
                  </h3>
                  <p className="text-muted-foreground">
                    I start with real problems I've experienced or observed, 
                    then work backwards to find the simplest solution.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Rapid Prototyping
                  </h3>
                  <p className="text-muted-foreground">
                    Quick iteration cycles to test ideas early and often, 
                    failing fast and learning faster.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Data-Driven
                  </h3>
                  <p className="text-muted-foreground">
                    Building in analytics from day one to understand user 
                    behavior and measure what matters.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center p-12 bg-gradient-subtle rounded-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Have an Idea? Let's Collaborate
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I love collaborating on interesting projects and helping other makers 
              bring their ideas to life. Whether you need product strategy, technical 
              guidance, or just want to brainstorm, I'm always up for a good conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero" asChild>
                <a href={`mailto:${portfolioConfig.personal.email}`}>
                  Start a Conversation
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a 
                  href={portfolioConfig.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Follow on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakerProjects;