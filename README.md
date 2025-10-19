# Modern Portfolio Template

A high-performance, modern portfolio website built with React, TypeScript, and Sanity CMS. Features optimized data fetching, dark beige styling, and a clean, minimalist design.

> **Created by [Vaibhav Bansal](https://github.com/vaibhav-bansal)** | [View Live Demo](https://vaibhav.bio) | [Report Issues](https://github.com/vaibhav-bansal/my-portfolio/issues)

## 🚀 Features

- ⚡ **Performance Optimized**: Single API call, aggressive caching, code splitting
- 🎨 **Modern Design**: Clean, minimalist interface with dark beige accents
- 📱 **Responsive**: Works perfectly on all devices
- 🔧 **CMS Integration**: Content managed via Sanity Studio
- 🚫 **No Scrolling**: Fixed viewport height design
- 🎯 **SEO Ready**: Optimized for search engines

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **CMS**: Sanity (headless CMS)
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Analytics**: Microsoft Clarity

## 🚀 Quick Start

### 1. Fork & Clone
```bash
git clone <YOUR_FORKED_REPO_URL>
cd my-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Sanity
1. Create a new project at [sanity.io](https://sanity.io)
2. Copy your project ID and dataset name
3. Create an API token with read permissions

### 4. Configure Environment
Create a `.env` file:
```env
VITE_SANITY_API_TOKEN=your_api_token_here
```

Update `src/lib/sanity.ts` with your Sanity project details:
```typescript
export const client = createClient({
  projectId: 'your-project-id',  // Replace with your project ID
  dataset: 'production',         // Replace with your dataset
  // ... rest of config
})
```

### 5. Add Your Content
1. Start the Sanity Studio:
```bash
cd studio-vaibhav.bio
npm install
npm run dev
```
2. Visit `http://localhost:3333` to manage your content
3. Add your personal information, projects, and social links

### 6. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:8081` to see your portfolio!

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main page components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
└── config/             # App configuration

studio-vaibhav.bio/     # Sanity Studio (content management)
├── schemaTypes/        # Content schema definitions
└── sanity.config.ts    # Studio configuration
```

## 🎨 Customization

### Content Types
The portfolio supports these content types (defined in Sanity):
- **Personal**: Name, hero message, summary
- **Focus Areas**: Skills/expertise areas
- **Projects**: Portfolio projects with images and links
- **Social Links**: Social media and contact links
- **Contact Settings**: Form webhook configuration

### Styling
- Modify colors in `src/index.css`
- Update component styles in individual files
- Dark beige tiles can be customized in `src/pages/About.tsx`

## 🚀 Deployment

### Option 1: Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Option 2: Netlify
1. Connect your GitHub repo to Netlify
2. Add environment variables
3. Deploy automatically

### Option 3: Any Static Host
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 📧 Contact Form Setup

The contact form sends data to a webhook URL configured in Sanity. You can use:
- **n8n**: Create a webhook workflow
- **Formspree**: Simple form handling service
- **Zapier**: Connect to email/CRM services
- **Custom API**: Build your own endpoint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Template Creator**: [Vaibhav Bansal](https://github.com/vaibhav-bansal) - [@vaibhav-bansal](https://github.com/vaibhav-bansal)
- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Content management by [Sanity](https://sanity.io/)
- Icons by [Lucide](https://lucide.dev/)

## ⚖️ License & Attribution

This project is open source and available under the [MIT License](LICENSE).

**Important**: If you use this template, please:
- ⭐ Star this repository
- 🔗 Link back to the original repository
- 📝 Mention the creator in your README
- 🐛 Report bugs and contribute improvements

---

**Created with ❤️ by [Vaibhav Bansal](https://github.com/vaibhav-bansal)**

**Happy coding!** 🎉
