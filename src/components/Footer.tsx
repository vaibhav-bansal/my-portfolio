import { Github, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-6 py-2 max-w-screen-xl">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Template by</span>
            <a 
              href="https://github.com/vaibhav-bansal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github className="h-3 w-3" />
              Vaibhav Bansal
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/vaibhav-bansal/my-portfolio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Source
            </a>
            <a 
              href="https://vaibhav.bio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Demo
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
