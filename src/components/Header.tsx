import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import portfolioConfig from "@/config/portfolio.json";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return location.pathname === "/" && location.hash === href;
    }
    return location.pathname === href;
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            aria-label={`${portfolioConfig.personal.name} - Home`}
          >
            {portfolioConfig.personal.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {portfolioConfig.navigation.map((item) => {
              const isComingSoon = portfolioConfig.comingSoon?.pages?.[item.href]?.enabled;
              
              return item.href === "#contact" ? (
                <button
                  key={item.name}
                  onClick={handleContactClick}
                  className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  } ${isComingSoon ? "relative" : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                  {isComingSoon && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border fade-in" role="navigation" aria-label="Mobile navigation">
            <nav className="flex flex-col space-y-3">
              {portfolioConfig.navigation.map((item) => {
                const isComingSoon = portfolioConfig.comingSoon?.pages?.[item.href]?.enabled;
                
                return item.href === "#contact" ? (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      handleContactClick(e);
                      setIsMenuOpen(false);
                    }}
                    className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground text-left"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    } ${isComingSoon ? "relative" : ""}`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name}
                    {isComingSoon && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Soon
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;