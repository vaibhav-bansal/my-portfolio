import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView, trackEvent } from "@/lib/posthog";

const NotFound = () => {
  useEffect(() => {
    trackPageView('NotFound');
  }, []);

  return (
    <PageLayout>
      <div className="h-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="container mx-auto max-w-4xl text-center">
          {/* 404 Visual */}
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <div className="text-6xl sm:text-8xl md:text-9xl font-bold text-foreground/10 mb-4">
              404
            </div>
          </div>

          {/* Error Message */}
          <div className="animate-fade-in mb-6 sm:mb-8" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Lost in the digital wilderness?
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
              Looks like you've wandered off the beaten path.
            </p>
          </div>

          {/* Help Cards */}
          <div className="animate-fade-in mb-8 sm:mb-12" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Double-Check the URL
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A small typo can lead to big adventures. 
                  Check if everything looks right in the address bar.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-green-100 flex items-center justify-center">
                  <ArrowLeft className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Retrace Your Steps
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The back button is your friend! It can take you back to 
                  where you started your journey.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Home className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Start Fresh
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sometimes the best solution is to begin again. 
                  Head back to the about page and explore.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link to="/">
                <Button 
                  size="lg"
                  onClick={() => trackEvent('not_found_go_home_clicked')}
                  className="px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base bg-primary hover:bg-primary/90 touch-manipulation w-full sm:w-auto"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go to About
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  trackEvent('not_found_go_back_clicked');
                  window.history.back();
                }}
                className="px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground touch-manipulation w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;