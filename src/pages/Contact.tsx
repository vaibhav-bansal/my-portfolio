import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Linkedin, Twitter, Github, BookOpen, Send } from "lucide-react";
import { useSocialLinks, useContactSettings } from "@/hooks/useSanity";
import DataError from "./DataError";
import LoadingSpinner from "@/components/LoadingSpinner";
import { trackPageView, trackEvent } from "@/lib/clarity";

const Contact = () => {
  const { data: socialLinks, isLoading: socialLinksLoading, error: socialLinksError } = useSocialLinks();
  const { data: contactSettings, isLoading: contactSettingsLoading, error: contactSettingsError } = useContactSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    trackPageView('Contact');
  }, []);

  // Error state
  if (socialLinksError || contactSettingsError) {
    return <DataError />;
  }

  // Loading state
  if (socialLinksLoading || contactSettingsLoading) {
    return (
      <PageLayout>
        <div className="px-6">
          <div className="container mx-auto max-w-5xl text-center">
            <LoadingSpinner size="lg" text="Loading contact information..." />
          </div>
        </div>
      </PageLayout>
    );
  }

  const iconMap: Record<string, any> = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
    medium: BookOpen,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(contactSettings?.webhookUrl || '', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "vaibhav.bio",
        }),
      });

      if (response.ok) {
        trackEvent('contact_form_submitted', { 
          name: formData.name, 
          email: formData.email,
          messageLength: formData.message.length 
        });
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Please try again or reach out via social media",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="px-6 py-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Let's Connect
              </h1>
              <p className="text-muted-foreground mb-8">
                Interested in working together? Drop me a message.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 min-h-[120px] resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Find me online
              </h2>

              <div className="space-y-4">
                {socialLinks?.map((link: any) => {
                  const Icon = iconMap[link.icon] || BookOpen;
                  return (
                    <a
                      key={link._id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_link_clicked', { platform: link.platform, url: link.url })}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.platform}
                      </span>
                    </a>
                  );
                }) || []}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
