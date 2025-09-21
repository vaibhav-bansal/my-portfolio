import { Download, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import portfolioConfig from "@/config/portfolio.json";

const About = () => {
  return (
    <div className="min-h-screen py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About <span className="gradient-text">{portfolioConfig.personal.name}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {portfolioConfig.personal.title}
            </p>
            <div className="flex items-center justify-center space-x-6 text-muted-foreground mb-8">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {portfolioConfig.personal.location}
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {portfolioConfig.personal.email}
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {portfolioConfig.personal.phone}
              </div>
            </div>
            <Button 
              size="lg" 
              className="btn-hero"
              asChild
            >
              <a 
                href={portfolioConfig.personal.resumeLink}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Bio Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Background</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {portfolioConfig.personal.bio}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                Currently serving as {portfolioConfig.personal.currentRole}, 
                I've spent {portfolioConfig.personal.yearsExperience}+ years 
                building products that users love and businesses need. 
                I believe in the power of data-driven decision making combined 
                with deep user empathy to create exceptional product experiences.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(portfolioConfig.skills).map(([category, skills]) => (
                <Card key={category} className="card-hover">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4 capitalize">
                      {category === "technical" ? "Technical" : category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience Highlights */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Experience Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-hover text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {portfolioConfig.personal.yearsExperience}+
                  </div>
                  <div className="text-muted-foreground">Years in Product Management</div>
                </CardContent>
              </Card>
              <Card className="card-hover text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {portfolioConfig.caseStudies.length}
                  </div>
                  <div className="text-muted-foreground">Major Product Launches</div>
                </CardContent>
              </Card>
              <Card className="card-hover text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {portfolioConfig.makerProjects.length}
                  </div>
                  <div className="text-muted-foreground">Side Projects Built</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Philosophy Section */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Product Philosophy</h2>
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">User-Centric</h3>
                    <p className="text-muted-foreground">
                      Every feature decision starts with understanding real user needs 
                      and pain points through research and data.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">Data-Driven</h3>
                    <p className="text-muted-foreground">
                      Leverage quantitative and qualitative insights to validate 
                      hypotheses and measure success.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">Iterative</h3>
                    <p className="text-muted-foreground">
                      Build, measure, learn, and improve through rapid experimentation 
                      and continuous feedback loops.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;