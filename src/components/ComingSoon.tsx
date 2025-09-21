import { Clock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import portfolioConfig from "@/config/portfolio.json";

interface ComingSoonProps {
  pageConfig: {
    title: string;
    subtitle: string;
    description: string;
    expectedDate?: string;
    features?: string[];
  };
}

const ComingSoon = ({ pageConfig }: ComingSoonProps) => {
  return (
    <div className="min-h-screen py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              Coming Soon
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {pageConfig.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {pageConfig.subtitle}
            </p>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageConfig.description}
            </p>
          </div>

          {/* Expected Date */}
          {pageConfig.expectedDate && (
            <div className="text-center mb-12">
              <Card className="inline-block">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Expected Launch:</span>
                    <span className="font-semibold text-foreground">{pageConfig.expectedDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Features Preview */}
          {pageConfig.features && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                What to Expect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pageConfig.features.map((feature, index) => (
                  <Card key={index} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-subtle border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Want to be notified when this section goes live? 
                  I'll send you an update when it's ready.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-primary" asChild>
                    <a href={`mailto:${portfolioConfig.personal.email}?subject=Notify me when ${pageConfig.title} is ready`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Notify Me
                    </a>
                  </Button>
                  <Button variant="outline" className="btn-outline" asChild>
                    <a href="/case-studies">
                      View Case Studies
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Indicator */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm">In active development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
