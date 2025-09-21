import { ExternalLink, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import portfolioConfig from "@/config/portfolio.json";

const Writing = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Writing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Thoughts on product management, user experience, and building products 
              that matter. I write about lessons learned, frameworks that work, 
              and insights from the trenches of product development.
            </p>
          </div>

          {/* Featured Article */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Featured Article</h2>
            <Card className="card-hover overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-square bg-gradient-card flex items-center justify-center">
                    <div className="text-muted-foreground text-lg font-medium">
                      Featured Article Visual
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {portfolioConfig.writing[0].tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                      {portfolioConfig.writing[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {portfolioConfig.writing[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(portfolioConfig.writing[0].publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{portfolioConfig.writing[0].readTime}</span>
                        </div>
                      </div>
                      <Button asChild>
                        <a 
                          href={portfolioConfig.writing[0].url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Read Article
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* All Articles */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">All Articles</h2>
            <div className="space-y-8">
              {portfolioConfig.writing.map((article) => (
                <Card key={article.id} className="card-hover">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`Read ${article.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Writing Topics */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">What I Write About</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  topic: "Product Strategy",
                  description: "Framework for making strategic product decisions and aligning teams",
                  icon: "🎯"
                },
                {
                  topic: "User Research",
                  description: "Methods for understanding users and validating product assumptions",
                  icon: "🔍"
                },
                {
                  topic: "Data & Analytics",
                  description: "Using data effectively to drive product decisions and measure success",
                  icon: "📊"
                },
                {
                  topic: "Team Leadership",
                  description: "Building and leading high-performing product teams",
                  icon: "👥"
                },
                {
                  topic: "Product Design",
                  description: "Collaboration between product and design for better user experiences",
                  icon: "🎨"
                },
                {
                  topic: "Career Growth",
                  description: "Advice for aspiring and growing product managers",
                  icon: "🚀"
                }
              ].map((item, index) => (
                <Card key={index} className="card-hover text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-semibold text-foreground mb-2">{item.topic}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="text-center p-12 bg-gradient-subtle rounded-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get notified when I publish new articles about product management, 
              user experience, and building better products. No spam, just valuable 
              insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero" asChild>
                <a 
                  href={portfolioConfig.social.medium} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Follow on Medium
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a 
                  href={portfolioConfig.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Follow on Twitter
                </a>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Writing;