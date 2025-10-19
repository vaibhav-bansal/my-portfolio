import { portfolioConfig } from "@/config/portfolio";
import PageLayout from "@/components/PageLayout";

const About = () => {
  const { personal, experience } = portfolioConfig;

  return (
    <PageLayout>
      <div className="h-full flex items-center justify-center px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Message */}
          <div className="mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {personal.heroMessage}
            </h1>
          </div>

          {/* Professional Summary */}
          <div className="animate-fade-in mb-12" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {experience.summary}
            </p>
          </div>

          {/* Focus Areas */}
          <div className="animate-fade-in mb-12" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experience.focusAreas.map((area, index) => (
                <div
                  key={area.title}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experience.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-xl bg-accent/30 border border-border"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
