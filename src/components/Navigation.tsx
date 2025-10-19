import { NavLink, Link } from "react-router-dom";
import { usePersonal, useAllData } from "@/hooks/useSanity";
import { useEffect } from "react";

const Navigation = () => {
  const { data: personal } = usePersonal();
  const { data: allData, isLoading } = useAllData();
  
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
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-screen-xl">
        <Link 
          to="/" 
          className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          {personal?.name || "Vaibhav"}
        </Link>
        
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                onMouseEnter={() => handleMouseEnter(item.path)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-foreground ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
