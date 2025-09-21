import { ArrowRight, Download, ExternalLink, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import portfolioConfig from "@/config/portfolio.json";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Hi, I'm{" "}
                <span className="gradient-text">
                  {portfolioConfig.personal.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
                {portfolioConfig.personal.title}
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {portfolioConfig.personal.tagline}
              </p>
            </div>

            <div className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="btn-hero"
                asChild
              >
                <Link to="/case-studies">
                  View My Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                asChild
              >
                <Link to="/about">
                  About Me
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="fade-in grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {portfolioConfig.personal.yearsExperience}+
                </div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {portfolioConfig.caseStudies.length}
                </div>
                <div className="text-sm text-muted-foreground">Case Studies</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-primary mb-2">
                  {portfolioConfig.makerProjects.length}
                </div>
                <div className="text-sm text-muted-foreground">Side Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {portfolioConfig.personal.bio}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(portfolioConfig.skills).map(([category, skills]) => (
                <Card key={category} className="card-hover">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 capitalize">
                      {category === "technical" ? "Technical" : category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Featured Case Studies
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real-world product challenges and the strategies I used to solve them
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {portfolioConfig.caseStudies.slice(0, 2).map((study) => (
                <Card key={study.id} className="card-hover group">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-card rounded-t-xl mb-6"></div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {study.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {study.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {study.duration} • {study.team}
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/case-studies/${study.id}`}>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/case-studies">
                  View All Case Studies
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Maker Projects Preview */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Side Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Personal projects where I experiment with new ideas and technologies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {portfolioConfig.makerProjects.map((project) => (
                <Card key={project.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {project.github && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.website && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-sm font-medium text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/maker-projects">
                  View All Projects
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 lg:py-32 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-xl mb-8 text-white/90">
              I'm always interested in discussing new opportunities and product challenges
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
              >
                <Link to="/about">
                  Learn More About Me
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/case-studies">
                  View My Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;