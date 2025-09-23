import { Download, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getConfig } from "@/lib/configLoader";

const About = () => {
  // Load configuration - this will throw if missing/invalid
  const portfolioConfig = getConfig();
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
              className="btn-hero"
              asChild
            >
              <a 
                href={portfolioConfig.personal.resumeLink}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-2" />
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
                {portfolioConfig.personal.background.intro}
              </p>
              
              {/* Domain Expertise - Inline */}
              <div className="mt-8">
                <div className="flex flex-wrap justify-center gap-2">
                  {portfolioConfig.personal.domains.map((domain) => (
                    <Badge key={domain} variant="outline" className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>
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
                  <div className="text-muted-foreground">{portfolioConfig.personal.background.highlights.majorLaunches}</div>
                </CardContent>
              </Card>
              <Card className="card-hover text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {portfolioConfig.makerProjects.length}
                  </div>
                  <div className="text-muted-foreground">{portfolioConfig.personal.background.highlights.sideProjects}</div>
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
                    <h3 className="text-xl font-semibold text-primary mb-3">{portfolioConfig.personal.background.philosophy.userCentric.title}</h3>
                    <p className="text-muted-foreground">
                      {portfolioConfig.personal.background.philosophy.userCentric.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{portfolioConfig.personal.background.philosophy.dataDriven.title}</h3>
                    <p className="text-muted-foreground">
                      {portfolioConfig.personal.background.philosophy.dataDriven.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{portfolioConfig.personal.background.philosophy.iterative.title}</h3>
                    <p className="text-muted-foreground">
                      {portfolioConfig.personal.background.philosophy.iterative.description}
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