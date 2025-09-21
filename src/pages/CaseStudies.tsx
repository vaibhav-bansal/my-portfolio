import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ComingSoonCard from "@/components/ComingSoonCard";
import portfolioConfig from "@/config/portfolio.json";

const CaseStudies = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep dives into real product challenges and the strategies I used to solve them. 
              Each case study includes the full process, artifacts, and measurable impact.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="space-y-12">
            {portfolioConfig.caseStudies.map((study, index) => {
              // Show coming soon card if marked as coming soon
              if (study.comingSoon) {
                return (
                  <Card key={study.id} className="card-hover overflow-hidden">
                    <CardContent className="p-0 relative">
                      <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                        {/* Image placeholder */}
                        <div className={`aspect-video lg:aspect-square bg-gradient-card flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                          <div className="text-muted-foreground text-lg font-medium">
                            {study.title} Preview
                          </div>
                        </div>
                        {/* Content placeholder */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <div className="space-y-4">
                            <div className="h-4 bg-muted rounded w-24"></div>
                            <div className="h-6 bg-muted rounded w-48"></div>
                            <div className="h-4 bg-muted rounded w-full"></div>
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>
                      {/* Coming Soon Overlay */}
                      <div className="absolute inset-0 z-10">
                        <ComingSoonCard className="w-full h-full" />
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              return (
                <Card key={study.id} className="card-hover overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                      {/* Image */}
                      <div className={`aspect-video lg:aspect-square bg-gradient-card flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        <div className="text-muted-foreground text-lg font-medium">
                          {study.title} Preview
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {study.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                          {study.title}
                        </h2>
                        
                        <p className="text-lg text-muted-foreground mb-6">
                          {study.description}
                      </p>

                      {/* Impact Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {Object.entries(study.impact).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-xl lg:text-2xl font-bold text-primary mb-1">
                              {value}
                            </div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <div className="font-medium">{study.duration}</div>
                          <div>{study.team}</div>
                        </div>
                        <Button variant="default" asChild>
                          <Link to={`/case-studies/${study.id}`}>
                            Read Case Study
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-20 p-12 bg-gradient-subtle rounded-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Interested in Working Together?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new product challenges and opportunities. 
              Let's chat about how I can help drive impact at your organization.
            </p>
            <Button className="btn-hero" asChild>
              <a href={`mailto:${portfolioConfig.personal.email}`}>
                Get In Touch
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;