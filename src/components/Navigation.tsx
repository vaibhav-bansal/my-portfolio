import { NavLink, Link } from "react-router-dom";
import { usePersonal, useAllData } from "@/hooks/useSanity";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const { data: personal } = usePersonal();
  const { data: allData, isLoading } = useAllData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: "About", path: "/" },
    { label: "Work", path: "/work" },
    { label: "Contact", path: "/contact" },
  ];

  // Prefetch data when hovering over navigation links
  const handleMouseEnter = (path: string) => {
    if (isLoading || !allData) return;
    
    // Preload the route component
    switch (path) {
      case "/":
        import("../pages/About");
        break;
      case "/work":
        import("../pages/Work");
        break;
      case "/contact":
        import("../pages/Contact");
        break;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between max-w-screen-xl">
        <Link 
          to="/" 
          className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          {personal?.name || "Alex Developer"}
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                onMouseEnter={() => handleMouseEnter(item.path)}
                className={({ isActive }) =>
                  `text-sm lg:text-base font-medium transition-colors hover:text-foreground ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-accent transition-colors touch-manipulation"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <ul className="container mx-auto px-4 sm:px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 text-base font-medium transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
