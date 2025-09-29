import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTestimonials } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";

const Testimonials = () => {
  const { data: testimonials, loading, error } = useTestimonials();

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">Testimonials</h1>
            <p className="text-xl text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !testimonials?.length) {
    // Fallback to static testimonials
    const fallbackTestimonials = [
      {
        _id: "1",
        name: "Sarah Chen",
        role: "Engineering Manager",
        company: "TechFlow Inc",
        image: "/images/testimonial-sarah.jpg",
        rating: 5,
        text: "Vaibhav's product vision and execution capabilities are exceptional. He consistently delivered features that increased user engagement by 40% while working closely with our engineering team.",
        project: "API Console Redesign"
      },
      {
        _id: "2",
        name: "Michael Rodriguez",
        role: "CTO",
        company: "FinanceNext",
        image: "/images/testimonial-michael.jpg",
        rating: 5,
        text: "Working with Vaibhav was a game-changer for our billing automation. His analytical approach and attention to user experience helped us reduce customer support tickets by 60%.",
        project: "Billing Automation Platform"
      },
      {
        _id: "3",
        name: "Priya Sharma",
        role: "Head of Marketing",
        company: "Quicko",
        image: "/images/testimonial-priya.jpg",
        rating: 5,
        text: "The Qpon campaign engine Vaibhav built transformed our marketing capabilities. We went from manual coupon creation to automated campaigns that drove 30k+ upgrades.",
        project: "Marketing Campaign Engine"
      }
    ];
    
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">Testimonials</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              What colleagues and partners say about working with me
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Testimonials
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            What colleagues and partners say about working with me
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">
            Ready to work together?
          </h2>
          <p className="text-muted-foreground mb-6">
            Let's discuss how I can help drive your product goals
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            onClick={(e) => {
              e.preventDefault();
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  const imageUrl = testimonial.image ? 
    (typeof testimonial.image === 'string' ? testimonial.image : urlFor(testimonial.image).width(300).height(300).url()) : 
    null;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-primary mb-4" />
        
        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
          "{testimonial.text}"
        </p>

        {/* Project Badge */}
        {testimonial.project && (
          <Badge variant="secondary" className="mb-4 self-start">
            {testimonial.project}
          </Badge>
        )}

        {/* Author Info */}
        <div className="flex items-center mt-auto">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mr-4">
              <span className="text-lg font-bold text-primary">
                {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
          )}
          <div>
            <h4 className="font-semibold text-foreground">
              {testimonial.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}
            </p>
            <p className="text-sm text-primary font-medium">
              {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonials;