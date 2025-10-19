import { NavLink } from "react-router-dom";
import { portfolioConfig } from "@/config/portfolio";

const Navigation = () => {
  const navItems = [
    { label: "About", path: "/" },
    { label: "Work", path: "/work" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-screen-xl">
        <div className="text-lg font-semibold text-foreground">
          {portfolioConfig.personal.name}
        </div>
        
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
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
