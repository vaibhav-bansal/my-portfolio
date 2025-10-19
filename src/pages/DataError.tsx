import PageLayout from "@/components/PageLayout";
import { AlertTriangle, RefreshCw, Wrench, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const DataError = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSubmitReport = async () => {
    setIsSubmitting(true);
    
    try {
      // Send error report email
      const response = await fetch('mailto:vaibhav@example.com?subject=Portfolio Error Report&body=Error occurred on portfolio website. Please investigate.', {
        method: 'GET'
      });
      
      // Simulate email sending (in real implementation, you'd use a proper email service)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Report submitted!",
        description: "Thank you for reporting this issue. We'll look into it.",
      });
      
      setReportSubmitted(true);
    } catch (error) {
      toast({
        title: "Failed to submit report",
        description: "Please try again or contact us directly",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="h-full flex items-center justify-center px-6 py-8">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Error Icon */}
          <div className="mb-8 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          {/* Error Message */}
          <div className="animate-fade-in mb-8" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Something's not quite right
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              It looks like our content management system is having a little hiccup. 
              Don't worry, this happens to the best of us!
            </p>
          </div>

          {/* Error Cards */}
          <div className="animate-fade-in mb-12" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Temporary Glitch
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our content delivery network is probably just taking a coffee break. 
                  It'll be back in a jiffy!
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-green-100 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Behind the Scenes
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We're probably updating something awesome right now. 
                  Great things take time, you know?
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-purple-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Quick Fix
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sometimes a simple refresh does the trick. 
                  Technology can be wonderfully unpredictable!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleRefresh}
                size="lg"
                className="px-8 bg-primary hover:bg-primary/90"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              {!reportSubmitted ? (
                <Button 
                  onClick={handleSubmitReport}
                  disabled={isSubmitting}
                  variant="outline" 
                  size="lg"
                  className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              ) : (
                <Button 
                  onClick={handleRefresh}
                  variant="outline" 
                  size="lg"
                  className="px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DataError;
