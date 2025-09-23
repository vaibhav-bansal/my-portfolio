import { Mail, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/contexts/ConfigContext";
import { handleNavigationClick } from "@/lib/navigation";

const Footer = () => {
  const { config: portfolioConfig, loading, error } = useConfig();
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <footer className="bg-muted/50 border-t border-border" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">Loading...</div>
        </div>
      </footer>
    );
  }

  // Show error state
  if (error || !portfolioConfig) {
    return (
      <footer className="bg-muted/50 border-t border-border" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-500">Configuration Error</div>
        </div>
      </footer>
    );
  }

  const SocialIcon = ({ platform, className }: { platform: string; className?: string }) => {
    switch (platform) {
      case 'linkedin':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'github':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'medium':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer id="contact" className="bg-muted/50 border-t border-border" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Info */}
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Contact
            </h3>
            <div className="space-y-3">
              <a 
                href={`mailto:${portfolioConfig.personal.email}`}
                className="flex items-center justify-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{portfolioConfig.personal.email}</span>
              </a>
              <a 
                href={`tel:${portfolioConfig.personal.phone}`}
                className="flex items-center justify-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{portfolioConfig.personal.phone}</span>
              </a>
              <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{portfolioConfig.personal.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              {/* Profile Section */}
              <div className="text-center">
                <h4 className="text-sm font-medium text-foreground mb-2">Profile</h4>
                <nav className="flex flex-col space-y-2" aria-label="Profile navigation">
                  <Link
                    to="/"
                    onClick={() => handleNavigationClick("/", location.pathname)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit mx-auto"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => handleNavigationClick("/about", location.pathname)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit mx-auto"
                  >
                    About
                  </Link>
                  <a
                    href={portfolioConfig.personal.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit mx-auto"
                  >
                    Download Resume
                  </a>
                </nav>
              </div>
              
              {/* Work Section */}
              <div className="text-center">
                <h4 className="text-sm font-medium text-foreground mb-2">Work</h4>
                <nav className="flex flex-col space-y-2" aria-label="Work navigation">
                  <Link
                    to="/case-studies"
                    onClick={() => handleNavigationClick("/case-studies", location.pathname)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit mx-auto"
                  >
                    Case Studies
                  </Link>
                  <Link
                    to="/maker-projects"
                    onClick={() => handleNavigationClick("/maker-projects", location.pathname)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit mx-auto"
                  >
                    AI Projects
                  </Link>
                </nav>
              </div>
              
              {/* Other Section */}
              <div className="text-center">
                <h4 className="text-sm font-medium text-foreground mb-2">Other</h4>
                <nav className="flex flex-col space-y-2" aria-label="Other navigation">
                  <Link
                    to="/writing"
                    onClick={() => handleNavigationClick("/writing", location.pathname)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit mx-auto"
                  >
                    Writing
                  </Link>
                  <Link
                    to="/resources"
                    onClick={() => handleNavigationClick("/resources", location.pathname)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit mx-auto"
                  >
                    Resources
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {Object.entries(portfolioConfig.social).map(([platform, url]) => {
                return (
                  <Button
                    key={platform}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <a 
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow on ${platform}`}
                    >
                      <SocialIcon platform={platform} className="w-5 h-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Built by {portfolioConfig.personal.name} with React, TypeScript, and Tailwind CSS. View repository on <a href="https://github.com/vaibhav-bansal/my-portfolio" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">GitHub</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;