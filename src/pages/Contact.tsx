import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Linkedin, Twitter, Github, BookOpen, Send, Phone } from "lucide-react";
import { useSocialLinks, useContactSettings, usePersonal } from "@/hooks/useSanity";
import DataError from "./DataError";
import LoadingSpinner from "@/components/LoadingSpinner";
import { trackPageView, trackEvent } from "@/lib/clarity";

const Contact = () => {
  const { data: socialLinks, isLoading: socialLinksLoading, error: socialLinksError } = useSocialLinks();
  const { data: contactSettings, isLoading: contactSettingsLoading, error: contactSettingsError } = useContactSettings();
  const { data: personal, isLoading: personalLoading, error: personalError } = usePersonal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    trackPageView('Contact');
  }, []);

  // Error state
  if (socialLinksError || contactSettingsError || personalError) {
    return <DataError />;
  }

  // Loading state
  if (socialLinksLoading || contactSettingsLoading || personalLoading) {
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

  // Country codes for phone number selector
  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
  ];

  // Validation functions
  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      
      case 'phone':
        if (value.trim() && !/^[\d\s\-\(\)]+$/.test(value)) {
          error = 'Please enter a valid phone number';
        } else if (value.trim() && value.replace(/\D/g, '').length < 7) {
          error = 'Phone number must be at least 7 digits';
        }
        break;
      
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
    }

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (error) {
        updatedErrors[field] = error;
      } else {
        delete updatedErrors[field];
      }

      return updatedErrors;
    });

    return !error;
  };

  const validateForm = () => {
    const fields = ['name', 'email', 'message'];
    let isValid = true;
    
    fields.forEach(field => {
      if (!validateField(field, formData[field as keyof typeof formData])) {
        isValid = false;
      }
    });
    
    // Validate phone if provided
    if (formData.phone.trim()) {
      if (!validateField('phone', formData.phone)) {
        isValid = false;
      }
    }
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(contactSettings?.webhookUrl || import.meta.env.VITE_CONTACT_WEBHOOK_URL || '', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          fullPhone: formData.phone ? `${formData.countryCode} ${formData.phone}` : '',
          timestamp: new Date().toISOString(),
          source: "vaibhav.bio",
        }),
      });

      if (response.ok) {
        trackEvent('contact_form_submitted', { 
          name: formData.name, 
          email: formData.email,
          phone: formData.phone ? 'provided' : 'not_provided',
          messageLength: formData.message.length 
        });
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", countryCode: "+91", message: "" });
        setErrors({});
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
            <div className="animate-fade-in hidden">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
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
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      validateField('name', e.target.value);
                    }}
                    onBlur={(e) => validateField('name', e.target.value)}
                    className={`mt-1 ${errors.name ? 'border-amber-600 bg-amber-50' : ''}`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-amber-700 underline">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      validateField('email', e.target.value);
                    }}
                    onBlur={(e) => validateField('email', e.target.value)}
                    className={`mt-1 ${errors.email ? 'border-amber-600 bg-amber-50' : ''}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-amber-700 underline">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    Phone <span className="text-sm text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        validateField('phone', e.target.value);
                      }}
                      onBlur={(e) => validateField('phone', e.target.value)}
                      className={`flex-1 ${errors.phone ? 'border-amber-600 bg-amber-50' : ''}`}
                      placeholder="Phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-amber-700 underline">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      validateField('message', e.target.value);
                    }}
                    onBlur={(e) => validateField('message', e.target.value)}
                    className={`mt-1 min-h-[120px] resize-none ${errors.message ? 'border-amber-600 bg-amber-50' : ''}`}
                    placeholder="Tell me about your project or idea..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-amber-700 underline">{errors.message}</p>
                  )}
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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Find me online
              </h1>
              <p className="text-muted-foreground mb-8">
                Connect with me on social platforms and see my latest work.
              </p>

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
