import { Clock } from "lucide-react";

interface ComingSoonCardProps {
  className?: string;
}

const ComingSoonCard = ({ className = "" }: ComingSoonCardProps) => {
  return (
    <div className={`group relative overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-md hover:from-background/70 hover:via-background/50 hover:to-background/70 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 ease-out cursor-pointer ${className}`}>
      {/* Glassmorphism overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, currentColor 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Coming Soon Content */}
      <div className="relative flex flex-col items-center justify-center h-full min-h-[200px] p-8">
        <div className="text-center space-y-4 group-hover:scale-105 transition-transform duration-500 ease-out">
          {/* Simple Blue Clock Icon */}
          <div className="flex justify-center">
            <Clock className="w-12 h-12 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
          </div>
          
          {/* Text */}
          <div>
            <p className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all duration-500">
              Coming Soon
            </p>
            <p className="text-sm text-muted-foreground/80 mt-1 group-hover:text-muted-foreground transition-colors duration-300">
              Content in development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;
