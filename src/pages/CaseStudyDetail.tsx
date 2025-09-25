import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useConfig } from "@/contexts/ConfigContext";
import { validateCaseStudy } from "@/lib/configValidation";
import { handleNavigationClick } from "@/lib/navigation";

const CaseStudyDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  
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
  
  const rawStudy = portfolioConfig.caseStudies.find(s => s.id === id);
  const study = rawStudy && validateCaseStudy(rawStudy) ? rawStudy : null;

  if (!study) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <Button asChild>
            <Link to="/work-projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Work Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="outline" className="btn-outline mb-8" asChild>
            <Link to="/work-projects" onClick={() => handleNavigationClick("/work-projects", location.pathname)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Work Projects
            </Link>
          </Button>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {study.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {study.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {study.subtitle}
            </p>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium">{study.duration}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Team</div>
                  <div className="font-medium">{study.team}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Role</div>
                  <div className="font-medium">Lead PM</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Impact</div>
                  <div className="font-medium text-accent">{Object.values(study.impact)[0]}</div>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="aspect-video bg-gradient-card rounded-xl mb-12 flex items-center justify-center" role="img" aria-label={study.imageAlt || `${study.title} case study visual`}>
            <div className="text-muted-foreground text-xl font-medium">
              {study.title} Case Study Visual
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Context */}
            {study.content?.context && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-6">Context</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {study.content.context}
                  </p>
                </div>
              </section>
            )}

            {/* Problem */}
            {study.content?.problem && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-6">Problem Statement</h2>
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-8">
                    <p className="text-lg leading-relaxed">
                      <strong>{study.content.problem}</strong>
                    </p>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Process */}
            {study.content?.process && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-6">Process & Methodology</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {study.content.process.map((phase, index) => (
                    <Card key={index} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-foreground">{phase.title}</h3>
                          <Badge variant="secondary">{phase.weeks}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{phase.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Key Artifacts */}
            {study.content?.artifacts && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-6">Key Artifacts</h2>
                <div className="space-y-6">
                  {study.content.artifacts.map((artifact, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-muted-foreground">{artifact}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Impact */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Impact & Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {Object.entries(study.impact).map(([key, value]) => (
                  <Card key={key} className="text-center p-6">
                    <div className="text-4xl font-bold text-primary mb-2">{value}</div>
                    <div className="text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </Card>
                ))}
              </div>
              {study.content?.impactDetails && (
                <p className="text-muted-foreground leading-relaxed">
                  {study.content.impactDetails}
                </p>
              )}
            </section>

            {/* Reflection */}
            {study.content?.reflection && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-6">Reflection & Learnings</h2>
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-8 space-y-4">
                    {study.content.reflection.whatWentWell && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">What Went Well</h3>
                        <p className="text-muted-foreground">
                          {study.content.reflection.whatWentWell}
                        </p>
                      </div>
                    )}
                    {study.content.reflection.whatIdDoDifferently && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">What I'd Do Differently</h3>
                        <p className="text-muted-foreground">
                          {study.content.reflection.whatIdDoDifferently}
                        </p>
                      </div>
                    )}
                    {study.content.reflection.keyTakeaway && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Key Takeaway</h3>
                        <p className="text-muted-foreground">
                          {study.content.reflection.keyTakeaway}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-20 pt-12 border-t border-border">
            <Button variant="outline" className="btn-outline" asChild>
              <Link to="/work-projects" onClick={() => handleNavigationClick("/work-projects", location.pathname)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Work Projects
              </Link>
            </Button>
            
            <Button className="btn-primary" asChild>
              <a href={`mailto:${portfolioConfig.personal.email}?subject=Let's discuss ${study.title}`}>
                Discuss This Project
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;