import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import portfolioConfig from "@/config/portfolio.json";

const CaseStudyDetail = () => {
  const { id } = useParams();
  const study = portfolioConfig.caseStudies.find(s => s.id === id);

  if (!study) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <Button asChild>
            <Link to="/case-studies">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
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
            <Link to="/case-studies">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
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
          <div className="aspect-video bg-gradient-card rounded-xl mb-12 flex items-center justify-center">
            <div className="text-muted-foreground text-xl font-medium">
              {study.title} Case Study Visual
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Context */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Context</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  This project emerged from a critical need to improve our mobile experience. 
                  User analytics showed a concerning 68% cart abandonment rate on mobile devices, 
                  significantly higher than our desktop conversion rate. With mobile traffic 
                  accounting for 65% of our total visits, this represented a major revenue 
                  opportunity that we needed to address urgently.
                </p>
              </div>
            </section>

            {/* Problem */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Problem Statement</h2>
              <Card className="bg-destructive/5 border-destructive/20">
                <CardContent className="p-8">
                  <p className="text-lg leading-relaxed">
                    <strong>How might we</strong> redesign the mobile checkout experience to reduce 
                    friction and increase conversion rates while maintaining security and user trust?
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Process */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Process & Methodology</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Discovery & Research",
                    description: "User interviews, analytics analysis, competitive research",
                    weeks: "2 weeks"
                  },
                  {
                    title: "Ideation & Design",
                    description: "Concept development, wireframing, prototyping",
                    weeks: "3 weeks"
                  },
                  {
                    title: "Testing & Iteration",
                    description: "User testing, A/B testing setup, design refinement",
                    weeks: "2 weeks"
                  },
                  {
                    title: "Launch & Optimization",
                    description: "Phased rollout, monitoring, performance optimization",
                    weeks: "4 weeks"
                  }
                ].map((phase, index) => (
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

            {/* Key Artifacts */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Key Artifacts</h2>
              <div className="space-y-6">
                {[
                  "User journey maps identifying friction points",
                  "Competitive analysis of 12 leading e-commerce platforms",
                  "High-fidelity prototypes tested with 50+ users",
                  "A/B testing framework and success metrics definition",
                  "Technical specification and implementation roadmap"
                ].map((artifact, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{artifact}</p>
                  </div>
                ))}
              </div>
            </section>

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
              <p className="text-muted-foreground leading-relaxed">
                The redesigned mobile checkout experience exceeded all our success metrics. 
                Beyond the quantitative improvements, we received overwhelmingly positive 
                user feedback, with many customers noting the smoother, more intuitive flow. 
                The success of this project led to its methodology being adopted across other 
                product teams in the organization.
              </p>
            </section>

            {/* Reflection */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Reflection & Learnings</h2>
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-8 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What Went Well</h3>
                    <p className="text-muted-foreground">
                      The close collaboration between design, engineering, and data teams 
                      enabled rapid iteration and testing. Our user-centered approach ensured 
                      we solved real problems rather than assumed ones.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What I'd Do Differently</h3>
                    <p className="text-muted-foreground">
                      I would have involved customer service teams earlier in the process 
                      to better understand common user support issues that could be 
                      prevented through better UX design.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Key Takeaway</h3>
                    <p className="text-muted-foreground">
                      Small UX improvements in critical user flows can have exponentially 
                      large business impact. The key is identifying the right leverage points 
                      through data and user research.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-20 pt-12 border-t border-border">
            <Button variant="outline" asChild>
              <Link to="/case-studies">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Case Studies
              </Link>
            </Button>
            
            <Button asChild>
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