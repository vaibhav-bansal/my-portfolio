# PM Portfolio Website

A modern, responsive, and highly customizable portfolio website template designed specifically for Product Managers. Built with React, TypeScript, and Tailwind CSS, this template helps PMs showcase their work, experience, and expertise in a professional and engaging way.

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
- **🔄 Coming Soon System** - Professional "coming soon" pages for incomplete sections
- **📊 Error Handling** - Comprehensive error boundaries and graceful fallbacks
- **🎨 Design System** - Consistent component library with shadcn/ui

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

### 3. Coming Soon Pages

Mark pages as "coming soon" for sections you're still working on:

```json
{
  "comingSoon": {
    "pages": {
      "/writing": {
        "enabled": true,
        "title": "Writing & Articles",
        "subtitle": "Thoughts on product management",
        "description": "Currently working on...",
        "expectedDate": "Q2 2024",
        "features": ["Feature 1", "Feature 2"]
      }
    }
  }
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
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── ComingSoon.tsx  # Coming soon page component
├── config/             # Configuration files
│   └── portfolio.json  # Main content configuration
├── pages/              # Page components
│   ├── Index.tsx       # Homepage
│   ├── About.tsx       # About page
│   ├── CaseStudies.tsx # Case studies listing
│   ├── CaseStudyDetail.tsx # Individual case study
│   ├── MakerProjects.tsx # Projects listing
│   ├── Writing.tsx     # Blog/articles
│   ├── Resources.tsx   # Downloadable resources
│   └── NotFound.tsx    # 404 page
├── lib/                # Utility functions
│   └── configValidation.ts # Config validation
├── hooks/              # Custom React hooks
└── index.css          # Global styles and design system
```

## 🎨 Design System

The portfolio uses a comprehensive design system with:

- **Semantic Color Tokens** - Consistent theming across components
- **Typography Scale** - Responsive font sizes and weights
- **Component Variants** - Reusable button and card styles
- **Animation Library** - Smooth transitions and hover effects
- **Standardized Buttons** - Consistent sizing and behavior

### Button Classes

- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary actions
- `.btn-outline` - Outlined buttons
- `.btn-hero` - Special gradient buttons for CTAs

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
2. Add route to `src/App.tsx`
3. Update navigation in `src/config/portfolio.json`
4. Optionally add to coming soon config

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

- **Personal Info** - Name, title, contact details
- **Case Studies** - Detailed project showcases
- **Projects** - Side projects and maker work
- **Writing** - Articles and blog posts
- **Resources** - Downloadable templates
- **Coming Soon** - Pages under development
- **SEO** - Meta tags and social sharing
- **Assets** - Image and resource management

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

- **[React](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Lucide React](https://lucide.dev/)** - Icon library

### Inspiration

- **Modern PM Portfolios** - Best practices from top product managers
- **Design Systems** - Industry standards for component libraries
- **Accessibility** - WCAG guidelines and inclusive design principles

---

## 🎯 Roadmap

### Planned Features

- **Content Management System** - Visual editor for portfolio content
- **Analytics Dashboard** - Built-in analytics and insights
- **Theme Customization** - Multiple color schemes and layouts
- **Blog Integration** - Built-in blog with markdown support
- **Contact Forms** - Serverless form handling
- **Multi-language Support** - Internationalization

### Contributing to Roadmap

Have ideas for new features? We'd love to hear them! Open a discussion or create an issue to share your suggestions.

---

**Made with ❤️ for the Product Management community. Star ⭐ this repo if it helped you!**

*This template is designed to help product managers create professional portfolios that effectively showcase their work and expertise. Whether you're a seasoned PM or just starting out, this template provides the foundation you need to build an impressive online presence.*