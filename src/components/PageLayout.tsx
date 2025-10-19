import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16 pb-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
