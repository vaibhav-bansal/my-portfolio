import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getConfig } from "@/lib/configLoader";
import { handleNavigationClick } from "@/lib/navigation";

const ProjectDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  
  // Load configuration - this will throw if missing/invalid
  const portfolioConfig = getConfig();
  const project = portfolioConfig.makerProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Button asChild>
            <Link to="/maker-projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
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
          <Button variant="ghost" className="mb-8" asChild>
            <Link to="/maker-projects" onClick={() => handleNavigationClick("/maker-projects", location.pathname)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {project.subtitle}
                </p>
              </div>
              
              <div className="flex space-x-4">
                {project.github && (
                  <Button variant="outline" asChild>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.website && (
                  <Button asChild>
                    <a 
                      href={project.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </header>

          {/* Hero Image */}
          <div className="aspect-video bg-gradient-card rounded-xl mb-12 flex items-center justify-center">
            <div className="text-muted-foreground text-xl font-medium">
              {project.title} Screenshot
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Inspiration */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Inspiration</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The idea for {project.title} came from a personal frustration I experienced 
                  while trying to build better habits. Existing apps were either too complex 
                  with overwhelming features, or too simple without the psychological principles 
                  that actually help habits stick.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I wanted to create something that combined the simplicity of a great mobile 
                  experience with proven behavioral psychology techniques. The goal was to make 
                  habit formation feel natural and rewarding, not like a chore.
                </p>
              </div>
            </section>

            {/* Build Process */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Build Process</h2>
              
              {/* Technical Stack */}
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Technical Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { category: "Frontend", tech: "React Native" },
                      { category: "Backend", tech: "Node.js" },
                      { category: "Database", tech: "PostgreSQL" },
                      { category: "Auth", tech: "Firebase Auth" }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="text-sm text-muted-foreground">{item.category}</div>
                        <div className="font-medium">{item.tech}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Development Timeline */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Development Timeline</h3>
                <div className="space-y-4">
                  {[
                    {
                      phase: "Week 1-2: Research & Planning",
                      description: "User interviews, competitive analysis, feature prioritization"
                    },
                    {
                      phase: "Week 3-4: MVP Development",
                      description: "Core habit tracking features, basic UI/UX implementation"
                    },
                    {
                      phase: "Week 5-6: Testing & Iteration",
                      description: "Beta testing with friends, bug fixes, UX improvements"
                    },
                    {
                      phase: "Week 7-8: Launch Preparation",
                      description: "App store optimization, analytics setup, launch strategy"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.phase}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Smart Reminders",
                    description: "Context-aware notifications that adapt to user behavior patterns"
                  },
                  {
                    title: "Streak Tracking",
                    description: "Visual progress tracking with motivational milestones"
                  },
                  {
                    title: "Habit Stacking",
                    description: "Link new habits to existing routines for higher success rates"
                  },
                  {
                    title: "Analytics Dashboard",
                    description: "Insights into patterns and trends to optimize habit formation"
                  }
                ].map((feature, index) => (
                  <Card key={index} className="card-hover">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Outcome & Learnings */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Outcome & Learnings</h2>
              
              <Card className="bg-accent/5 border-accent/20 mb-8">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Results</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.title} exceeded my initial expectations, gaining {project.stats.downloads} 
                    downloads within the first 6 months and maintaining a {project.stats.rating} rating 
                    on app stores. More importantly, user feedback showed that 78% of active users 
                    successfully maintained their habits for 30+ days, significantly higher than 
                    industry averages.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">What I Learned</h3>
                  <ul className="space-y-3">
                    {[
                      "The importance of focusing on core user value rather than feature breadth",
                      "How behavioral psychology principles can significantly impact user engagement",
                      "The value of early user feedback in shaping product direction",
                      "Mobile-first design considerations for habit-forming apps"
                    ].map((learning, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-muted-foreground">{learning}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Future Enhancements</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Based on user feedback and usage patterns, I'm planning to add social features 
                    for accountability partners, integration with health apps, and AI-powered 
                    personalized coaching. The goal is to make habit formation even more effective 
                    while maintaining the app's core simplicity.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-20 pt-12 border-t border-border">
            <Button variant="outline" asChild>
              <Link to="/maker-projects" onClick={() => handleNavigationClick("/maker-projects", location.pathname)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Projects
              </Link>
            </Button>
            
            <div className="flex space-x-4">
              {project.github && (
                <Button variant="outline" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
              {project.website && (
                <Button asChild>
                  <a href={project.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Try It Live
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;