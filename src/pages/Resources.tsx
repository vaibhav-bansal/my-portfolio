import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";
import ComingSoonCard from "@/components/ComingSoonCard";
import { getConfig } from "@/lib/configLoader";

const Resources = () => {
  // Load configuration - this will throw if missing/invalid
  const portfolioConfig = getConfig();
  // Check if all resources are coming soon
  const allResourcesComingSoon = portfolioConfig.resources.every(resource => resource.comingSoon);
  
  if (allResourcesComingSoon) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                PM Resources
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Free templates, frameworks, and tools for product managers.
              </p>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioConfig.resources.map((resource) => {
                if (resource.comingSoon) {
                  return <ComingSoonCard key={resource.title} />;
                }
                
                return (
                  <Card key={resource.title} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Badge variant="outline" className="text-xs mb-3">
                            {getTypeIcon(resource.type)}
                            <span className="ml-2">{resource.type}</span>
                          </Badge>
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {resource.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          Download Free
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'template':
        return <FileText className="w-5 h-5" />;
      case 'framework':
        return <FileText className="w-5 h-5" />;
      case 'kit':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'template':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'framework':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'kit':
        return 'bg-purple-500/10 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              PM Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Free templates, frameworks, and tools I've developed and use in my 
              day-to-day product management work. Download, customize, and use them 
              to accelerate your product development process.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">15k+</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Templates</div>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">2k+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </div>

          {/* Featured Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Featured Resources</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {portfolioConfig.resources.slice(0, 2).map((resource) => (
                <Card key={resource.title} className="card-hover overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-card flex items-center justify-center">
                      <div className="text-muted-foreground text-lg font-medium">
                        Resource Preview
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <Badge 
                          variant="outline" 
                          className={getTypeColor(resource.type)}
                        >
                          {getTypeIcon(resource.type)}
                          <span className="ml-2">{resource.type}</span>
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {resource.description}
                      </p>
                      <Button className="w-full" asChild>
                        <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          Download Free
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* All Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">All Resources</h2>
            <div className="space-y-6">
              {portfolioConfig.resources.map((resource) => (
                <Card key={resource.title} className="card-hover">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge 
                            variant="outline" 
                            className={getTypeColor(resource.type)}
                          >
                            {getTypeIcon(resource.type)}
                            <span className="ml-2">{resource.type}</span>
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {resource.description}
                        </p>
                      </div>
                      <div className="flex space-x-3 ml-6">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" asChild>
                          <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Resource Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Resource Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  category: "Strategy",
                  description: "Roadmapping, OKRs, and strategic planning",
                  icon: "🎯",
                  count: "8 resources"
                },
                {
                  category: "Research",
                  description: "User interviews, surveys, and testing",
                  icon: "🔍",
                  count: "12 resources"
                },
                {
                  category: "Planning",
                  description: "PRDs, specifications, and requirements",
                  icon: "📋",
                  count: "15 resources"
                },
                {
                  category: "Analytics",
                  description: "Metrics, tracking, and measurement",
                  icon: "📊",
                  count: "10 resources"
                }
              ].map((category, index) => (
                <Card key={index} className="card-hover text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {category.category}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="mb-16">
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Usage Guidelines</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">✅ You Can</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Use for personal and commercial projects</li>
                      <li>• Modify and customize to fit your needs</li>
                      <li>• Share with your team and organization</li>
                      <li>• Create derivative works</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">❌ Please Don't</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Sell or redistribute as-is</li>
                      <li>• Claim ownership of the original work</li>
                      <li>• Remove attribution when sharing publicly</li>
                      <li>• Use for spam or malicious purposes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <div className="text-center p-12 bg-gradient-hero text-white rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Need Custom Resources?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              I create custom templates, frameworks, and training materials for teams 
              and organizations. Let's discuss how I can help streamline your product 
              development process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
              >
                <a href={`mailto:${portfolioConfig.personal.email}?subject=Custom Resources Inquiry`}>
                  Get Custom Resources
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <a href="#newsletter">
                  Get Updates
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;