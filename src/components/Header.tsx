import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/contexts/ConfigContext";
import { handleNavigationClick } from "@/lib/navigation";

const Header = () => {
  const { config: portfolioConfig, loading, error } = useConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return location.pathname === "/" && location.hash === href;
    }
    return location.pathname === href;
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Always scroll to footer on current page
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    handleNavigationClick(href, location.pathname, () => setIsMenuOpen(false));
  };

  // Show loading state
  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="banner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold gradient-text">Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  // Show error state
  if (error || !portfolioConfig) {
    return (
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="banner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-red-500">Configuration Error</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              handleNavClick("/");
            }}
            className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            aria-label={`${portfolioConfig.personal.name} - Home`}
          >
            {portfolioConfig.personal.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {portfolioConfig.navigation.map((item) => {
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
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
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
                    onClick={() => handleNavClick(item.href)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name}
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