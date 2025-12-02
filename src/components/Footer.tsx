import { Github, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 max-w-screen-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span>Template by</span>
            <a 
              href="https://github.com/vaibhav-bansal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors touch-manipulation"
            >
              <Github className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="whitespace-nowrap">Vaibhav Bansal</span>
            </a>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href="https://github.com/vaibhav-bansal/my-portfolio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors touch-manipulation"
            >
              <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Source</span>
            </a>
            <a 
              href="https://vaibhav.bio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors touch-manipulation"
            >
              <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Demo</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
