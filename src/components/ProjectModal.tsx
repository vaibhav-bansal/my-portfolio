import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

interface ProjectModalProps {
  project: {
    _id?: string;
    id?: string;
    title: string;
    subtitle?: string;
    description: PortableTextBlock[] | string;
    tags?: string[];
    url?: string;
    color?: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        style={project.color ? {
          borderColor: project.color,
          borderWidth: '2px'
        } : {}}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold">
            {project.title}
          </DialogTitle>
          {project.subtitle && (
            <DialogDescription className="text-lg md:text-xl text-muted-foreground font-medium pt-2">
              {project.subtitle}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Full Description */}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {Array.isArray(project.description) ? (
              <PortableText value={project.description} />
            ) : (
              <p className="text-base leading-relaxed text-foreground">
                {project.description}
              </p>
            )}
          </div>

          {/* Tags Section */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-sm py-1 px-3"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Project Link */}
          {project.url && (
            <div className="pt-4">
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto touch-manipulation"
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;

