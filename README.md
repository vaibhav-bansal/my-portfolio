# Product Manager Portfolio Website

A modern, responsive, and highly customizable portfolio website template designed specifically for Product Managers. Built with React, TypeScript, and Tailwind CSS, this template helps PMs showcase their work, experience, and expertise in a professional and engaging way.

## ✨ Features

- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **🎨 Modern Design** - Clean, professional design with subtle animations
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and builds
- **🔧 Highly Customizable** - Easy configuration through JSON file
- **📝 Case Study Templates** - Structured templates for showcasing PM work
- **🚀 Project Showcase** - Dedicated sections for side projects and maker work
- **✍️ Writing Integration** - Blog/article integration with external platforms
- **📄 Resource Downloads** - Share templates and frameworks with visitors
- **🎯 SEO Optimized** - Built-in SEO best practices
- **♿ Accessible** - WCAG compliant and screen reader friendly

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (install via [nvm](https://github.com/nvm-sh/nvm))
- Git

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
    "resumeLink": "/path-to-your-resume.pdf"
  }
}
```

### 2. Case Studies

Add your case studies to the `caseStudies` array:

```json
{
  "caseStudies": [
    {
      "id": "unique-case-id",
      "title": "Project Title",
      "subtitle": "One-line impact statement",
      "description": "Brief description...",
      "tags": ["UX Research", "A/B Testing"],
      "duration": "3 months",
      "team": "Designer, 2 Engineers",
      "impact": {
        "metric1": "+32%",
        "metric2": "$2.4M annually"
      }
    }
  ]
}
```

### 3. Projects & Writing

Similarly, update `makerProjects` and `writing` arrays with your content.

### 4. Styling

Customize the design system in `src/index.css`:

- **Colors**: Update CSS custom properties for brand colors
- **Typography**: Modify font imports and variables
- **Animations**: Adjust transition durations and effects

### 5. Add Your Resume

1. Add your resume PDF to the `public` folder
2. Update the `resumeLink` in the configuration file
3. Ensure the path matches your file location

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
├── config/             # Configuration files
│   └── portfolio.json  # Main content configuration
├── pages/              # Page components
│   ├── Index.tsx       # Homepage
│   ├── CaseStudies.tsx # Case studies listing
│   ├── Writing.tsx     # Blog/articles
│   └── Resources.tsx   # Downloadable resources
├── lib/                # Utility functions
└── styles/            # Global styles and design system
```

## 🎨 Design System

The portfolio uses a comprehensive design system with:

- **Semantic Color Tokens** - Consistent theming across components
- **Typography Scale** - Responsive font sizes and weights
- **Component Variants** - Reusable button and card styles
- **Animation Library** - Smooth transitions and hover effects

### Customizing Colors

Edit the CSS custom properties in `src/index.css`:

```css
:root {
  --primary: 217 91% 60%;        /* Your brand primary */
  --accent: 142 76% 36%;         /* Accent color */
  --gradient-hero: linear-gradient(...); /* Hero gradient */
}
```

## 📊 Analytics & SEO

### SEO Features

- Semantic HTML structure
- Open Graph meta tags
- Structured data for better search visibility
- Fast loading times with optimized assets

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

1. **Lovable** (Recommended)
   - Click "Publish" in the Lovable interface
   - Automatic deployments with custom domain support

2. **Netlify**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Vercel**
   - Import project from GitHub
   - Zero-config deployment with automatic builds

## 🔧 Advanced Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add route to `src/App.tsx`
3. Update navigation in `src/config/portfolio.json`

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

## 🤝 Contributing

This is an open-source template. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation Issues**: Open an issue on GitHub
- **Customization Help**: Check the discussions section
- **Bug Reports**: Use the issue tracker with detailed reproduction steps

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ for the Product Management community. Star ⭐ this repo if it helped you!