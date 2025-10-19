import { ReactNode } from "react";
import Navigation from "./Navigation";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16 h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
