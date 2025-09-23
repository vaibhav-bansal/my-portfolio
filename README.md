# PM Portfolio Website

A modern, responsive, and highly customizable portfolio website template designed specifically for Product Managers. Built with React, TypeScript, and Tailwind CSS, this template helps PMs showcase their work, experience, and expertise in a professional and engaging way.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🎛️ Customization](#️-customization)
- [📁 Project Structure](#-project-structure)
- [🎨 Design System](#-design-system)
- [📊 Analytics & SEO](#-analytics--seo)
- [🚀 Deployment](#-deployment)
- [🔧 Advanced Customization](#-advanced-customization)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🆘 Support](#-support)
- [🙏 Acknowledgments](#-acknowledgments)
- [🎯 Roadmap](#-roadmap)

## ✨ Features

### 🎯 **Core Features**
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **🎨 Modern Design** - Clean, professional design with subtle animations
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and builds
- **🔧 Highly Customizable** - Easy configuration through JSON file
- **📝 Case Study Templates** - Structured templates for showcasing PM work
- **🚀 Project Showcase** - Dedicated sections for side projects and maker work
- **✍️ Writing Integration** - Blog/article integration with external platforms
- **📄 Resource Downloads** - Share templates and frameworks with visitors

### 🛠️ **Technical Features**
- **🎯 SEO Optimized** - Built-in SEO best practices and meta tags
- **♿ Accessible** - WCAG 2.1 AA compliant and screen reader friendly
- **🔒 Type Safe** - Full TypeScript implementation with validation
- **🔄 Coming Soon Cards** - Professional placeholder components for incomplete sections
- **📊 Error Handling** - Comprehensive error boundaries and graceful fallbacks
- **🎨 Design System** - Consistent component library with shadcn/ui
- **⚡ React Query** - Built-in data fetching and caching
- **🎭 Smooth Animations** - Tailwind CSS animations and transitions

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm (install via [nvm](https://github.com/nvm-sh/nvm))
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pm-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🎛️ Customization

### 1. Personal Information

Edit `src/config/portfolio.json` to customize all content:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Senior Product Manager",
    "tagline": "Your unique value proposition",
    "email": "your.email@domain.com",
    "resumeLink": "https://drive.google.com/file/d/your-resume.pdf"
  }
}
```

### 2. Case Studies

Add your case studies to the `caseStudies` array with detailed content structure:

```json
{
  "caseStudies": [
    {
      "id": "unique-case-id",
      "title": "Project Title",
      "subtitle": "One-line impact statement",
      "description": "Brief description...",
      "content": {
        "context": "Project background and motivation",
        "problem": "Problem statement or challenge",
        "process": [
          {
            "title": "Phase Name",
            "description": "What was done",
            "weeks": "Duration"
          }
        ],
        "artifacts": ["Key deliverables and artifacts"],
        "impactDetails": "Detailed impact description",
        "reflection": {
          "whatWentWell": "Success factors",
          "whatIdDoDifferently": "Lessons learned",
          "keyTakeaway": "Main insight"
        }
      }
    }
  ]
}
```

### 3. Coming Soon Content

Mark individual items as "coming soon" by adding `"comingSoon": true` to any case study, project, article, or resource:

```json
{
  "caseStudies": [
    {
      "id": "project-example",
      "title": "Project Title",
      "comingSoon": true,
      // ... other fields
    }
  ],
  "makerProjects": [
    {
      "id": "side-project",
      "title": "Side Project",
      "comingSoon": true,
      // ... other fields
    }
  ],
  "writing": [
    {
      "id": "article-example",
      "title": "Article Title",
      "comingSoon": true,
      // ... other fields
    }
  ],
  "resources": [
    {
      "title": "Resource Title",
      "comingSoon": true,
      // ... other fields
    }
  ]
}
```

### 4. Styling & Design

Customize the design system in `src/index.css`:

```css
:root {
  --primary: 217 91% 60%;        /* Your brand primary */
  --accent: 142 76% 36%;         /* Accent color */
  --gradient-hero: linear-gradient(...); /* Hero gradient */
}
```

### 5. SEO Configuration

Update SEO metadata in the config:

```json
{
  "seo": {
    "title": "Your Name - Product Manager Portfolio",
    "description": "Your portfolio description",
    "keywords": ["Product Manager", "Your Keywords"],
    "author": "Your Name"
  }
}
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components (50+ components)
│   ├── Layout.tsx      # Main layout wrapper with routing
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── ComingSoonCard.tsx # Coming soon placeholder component
│   ├── ErrorBoundary.tsx  # Error handling component
│   └── ScrollToTop.tsx    # Scroll behavior utility
├── config/             # Configuration files
│   └── portfolio.json  # Main content configuration
├── pages/              # Page components
│   ├── Index.tsx       # Homepage with hero and previews
│   ├── About.tsx       # About page
│   ├── CaseStudies.tsx # Case studies listing
│   ├── CaseStudyDetail.tsx # Individual case study detail
│   ├── MakerProjects.tsx # Side projects listing
│   ├── ProjectDetail.tsx  # Individual project detail
│   ├── Writing.tsx     # Articles and blog posts
│   ├── Resources.tsx   # Downloadable templates and tools
│   └── NotFound.tsx   # 404 error page
├── lib/                # Utility functions
│   ├── configValidation.ts # Config validation
│   ├── navigation.ts   # Navigation utilities
│   └── utils.ts       # General utilities
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx  # Mobile detection hook
│   └── use-toast.ts    # Toast notifications
├── App.tsx             # Main app component with routing
├── main.tsx           # Application entry point
└── index.css          # Global styles and design system
```

## 🎨 Design System

The portfolio uses a comprehensive design system built on Tailwind CSS with:

- **Semantic Color Tokens** - HSL-based color system with CSS custom properties
- **Typography Scale** - Inter font family with responsive sizing
- **Component Variants** - shadcn/ui components with consistent styling
- **Animation Library** - Tailwind CSS transitions and custom animations
- **Gradient System** - Hero, card, and subtle gradient variations
- **Glassmorphism Effects** - Modern backdrop blur and transparency

### Key Design Tokens

- **Primary Colors**: Professional blue (`hsl(217 91% 60%)`) and success green (`hsl(142 76% 36%)`)
- **Gradients**: `gradient-hero`, `gradient-card`, `gradient-subtle`
- **Button Classes**: `btn-hero` for CTAs, standard shadcn/ui variants
- **Card Effects**: `card-hover` for interactive cards with smooth transitions
- **Animation Classes**: `fade-in-up`, `gradient-text` for visual enhancements

## 📊 Analytics & SEO

### SEO Features

- **Dynamic Meta Tags** - Configurable through JSON
- **Structured Data Ready** - Framework for adding JSON-LD
- **Semantic HTML** - Proper heading hierarchy and landmarks
- **Fast Loading** - Optimized assets and lazy loading ready
- **Mobile Optimized** - Responsive design and mobile-first approach

### Adding Analytics

1. **Google Analytics**: Add your tracking ID to `index.html`
2. **Plausible**: Add script tag for privacy-focused analytics
3. **Custom Events**: Track button clicks and downloads

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

#### 1. **Vercel** (Recommended)
- Import project from GitHub
- Zero-config deployment with automatic builds
- Custom domain support
- Preview deployments for branches

#### 2. **Netlify**
- Connect your GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`
- Form handling and serverless functions support

#### 3. **GitHub Pages**
- Enable GitHub Pages in repository settings
- Use GitHub Actions for automated deployment
- Custom domain support available

#### 4. **Traditional Hosting**
- Build the project: `npm run build`
- Upload the `dist` folder to your web server
- Configure server for SPA routing (redirect all routes to index.html)

## 🔧 Advanced Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add route to `src/App.tsx` within the Layout wrapper
3. Update navigation in `src/config/portfolio.json`
4. Optionally mark content as `"comingSoon": true` in config

### Custom Components

The portfolio uses [shadcn/ui](https://ui.shadcn.com/) components. Add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

### Environment Variables

For sensitive data (API keys, analytics IDs), use environment variables:

1. Create `.env.local` file
2. Add variables with `VITE_` prefix
3. Access via `import.meta.env.VITE_VARIABLE_NAME`

### Content Management

The entire site is driven by the `portfolio.json` configuration file:

- **Personal Info** - Name, title, bio, metrics, and contact details
- **Case Studies** - Detailed project showcases with impact metrics
- **Maker Projects** - Side projects with stats and links
- **Writing** - Articles with external links and metadata
- **Resources** - Downloadable templates and frameworks
- **Skills** - Organized by category (product, technical, design, leadership)
- **Social Links** - LinkedIn, Twitter, GitHub, Medium profiles
- **SEO** - Meta tags, Open Graph, and Twitter cards
- **Navigation** - Menu structure and routing
- **Assets** - Fallback images and loading states

## 🤝 Contributing

This is an open-source template. Contributions are welcome!

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Code Standards

- **TypeScript** - All new code should be typed
- **ESLint** - Follow the configured linting rules
- **Component Structure** - Use functional components with hooks
- **Styling** - Use Tailwind CSS classes and design system tokens
- **Accessibility** - Ensure WCAG 2.1 AA compliance

### Reporting Issues

When reporting issues, please include:

- **Browser and version**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Console errors** (if any)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- **Documentation Issues**: Open an issue on GitHub
- **Customization Help**: Check the discussions section
- **Bug Reports**: Use the issue tracker with detailed reproduction steps

### Community

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features
- **Pull Requests**: Contribute improvements

## 🙏 Acknowledgments

### Built With

- **[React 18](https://reactjs.org/)** - UI library with hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality component library (50+ components)
- **[React Router v6](https://reactrouter.com/)** - Client-side routing
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Zod](https://zod.dev/)** - Schema validation

### Inspiration

- **Modern PM Portfolios** - Best practices from top product managers
- **Design Systems** - Industry standards for component libraries
- **Accessibility** - WCAG guidelines and inclusive design principles

---

## 🎯 Roadmap

### Planned Features

- **Dark Mode Toggle** - Built-in theme switching capability
- **Contact Forms** - Serverless form handling with validation
- **Blog Integration** - Built-in markdown blog with CMS
- **Analytics Integration** - Easy setup for Google Analytics, Plausible, etc.
- **Multi-language Support** - Internationalization (i18n)
- **Advanced Animations** - Framer Motion integration for enhanced UX
- **PWA Support** - Progressive Web App capabilities
- **Performance Monitoring** - Built-in Core Web Vitals tracking

### Contributing to Roadmap

Have ideas for new features? We'd love to hear them! Open a discussion or create an issue to share your suggestions.

---

**Made with ❤️ for the Product Management community. Star ⭐ this repo if it helped you!**

*This template is designed to help product managers create professional portfolios that effectively showcase their work and expertise. Whether you're a seasoned PM or just starting out, this template provides the foundation you need to build an impressive online presence.*