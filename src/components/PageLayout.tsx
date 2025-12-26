import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-14 sm:pt-16 pb-20 sm:pb-24 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
