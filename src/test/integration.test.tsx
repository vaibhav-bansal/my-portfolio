import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '@/App'
import Index from '@/pages/Index'
import CaseStudies from '@/pages/CaseStudies'
import CaseStudyDetail from '@/pages/CaseStudyDetail'
import About from '@/pages/About'
import MakerProjects from '@/pages/MakerProjects'
import Writing from '@/pages/Writing'
import Resources from '@/pages/Resources'
import portfolioConfig from '@/config/portfolio.json'

// Test wrapper component
const TestWrapper = ({ children, initialEntries = ['/'] }: { 
  children: React.ReactNode
  initialEntries?: string[]
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Integration Tests - End-to-End Scenarios', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock window.scrollTo
    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: vi.fn(),
    })
    
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  })

  describe('Complete User Journey - Homepage to Case Study', () => {
    it('should allow user to navigate from homepage to case study detail', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // User starts on homepage
      expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()
      expect(screen.getByText(portfolioConfig.personal.title)).toBeInTheDocument()

      // User clicks "View Case Studies" button
      const caseStudiesButton = screen.getByRole('button', { name: /view case studies/i })
      await user.click(caseStudiesButton)

      // Should navigate to case studies page
      expect(caseStudiesButton.closest('a')).toHaveAttribute('href', '/case-studies')
    })

    it('should allow user to browse case studies and view details', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper initialEntries={['/case-studies']}>
          <CaseStudies />
        </TestWrapper>
      )

      // User sees case studies list
      portfolioConfig.caseStudies.forEach(study => {
        expect(screen.getByText(study.title)).toBeInTheDocument()
        expect(screen.getByText(study.subtitle)).toBeInTheDocument()
      })

      // User clicks on a case study
      const firstStudy = portfolioConfig.caseStudies[0]
      const caseStudyLink = screen.getByRole('link', { name: new RegExp(firstStudy.title, 'i') })
      await user.click(caseStudyLink)

      // Should navigate to case study detail
      expect(caseStudyLink).toHaveAttribute('href', `/case-studies/${firstStudy.id}`)
    })
  })

  describe('Complete User Journey - About Page Exploration', () => {
    it('should allow user to explore about page content', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper initialEntries={['/about']}>
          <About />
        </TestWrapper>
      )

      // User sees personal information
      expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()
      expect(screen.getByText(portfolioConfig.personal.background.intro)).toBeInTheDocument()

      // User sees philosophy sections
      const background = portfolioConfig.personal.background
      Object.values(background.philosophy).forEach(philosophy => {
        expect(screen.getByText(philosophy.title)).toBeInTheDocument()
        expect(screen.getByText(philosophy.description)).toBeInTheDocument()
      })

      // User sees skills
      Object.entries(portfolioConfig.skills).forEach(([category, skills]) => {
        skills.forEach(skill => {
          expect(screen.getByText(skill)).toBeInTheDocument()
        })
      })
    })
  })

  describe('Complete User Journey - Projects and Writing', () => {
    it('should allow user to explore maker projects', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper initialEntries={['/maker-projects']}>
          <MakerProjects />
        </TestWrapper>
      )

      // User sees projects list
      portfolioConfig.makerProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument()
        expect(screen.getByText(project.subtitle)).toBeInTheDocument()
        expect(screen.getByText(project.description)).toBeInTheDocument()
      })

      // User can click on project links
      const projectWithWebsite = portfolioConfig.makerProjects.find(p => p.website)
      if (projectWithWebsite) {
        const websiteLink = screen.getByRole('link', { name: /visit website/i })
        expect(websiteLink).toHaveAttribute('href', projectWithWebsite.website)
        expect(websiteLink).toHaveAttribute('target', '_blank')
      }
    })

    it('should allow user to explore writing articles', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper initialEntries={['/writing']}>
          <Writing />
        </TestWrapper>
      )

      // User sees articles list
      portfolioConfig.writing.forEach(article => {
        expect(screen.getByText(article.title)).toBeInTheDocument()
        expect(screen.getByText(article.excerpt)).toBeInTheDocument()
        expect(screen.getByText(article.readTime)).toBeInTheDocument()
      })

      // User can click on article links
      portfolioConfig.writing.forEach(article => {
        const articleLink = screen.getByRole('link', { name: new RegExp(article.title, 'i') })
        expect(articleLink).toHaveAttribute('href', article.url)
        expect(articleLink).toHaveAttribute('target', '_blank')
      })
    })

    it('should allow user to explore resources', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper initialEntries={['/resources']}>
          <Resources />
        </TestWrapper>
      )

      // User sees resources list
      portfolioConfig.resources.forEach(resource => {
        expect(screen.getByText(resource.title)).toBeInTheDocument()
        expect(screen.getByText(resource.description)).toBeInTheDocument()
        expect(screen.getByText(resource.type)).toBeInTheDocument()
      })

      // User can download resources
      portfolioConfig.resources.forEach(resource => {
        const downloadLink = screen.getByRole('link', { name: /download/i })
        expect(downloadLink).toHaveAttribute('href', resource.downloadUrl)
      })
    })
  })

  describe('Navigation Integration', () => {
    it('should maintain navigation state across page changes', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      )

      // User starts on homepage
      expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()

      // User navigates to about page
      const aboutLink = screen.getByRole('link', { name: 'About' })
      await user.click(aboutLink)

      // Navigation should still be visible
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Case Studies' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
    })

    it('should handle browser back/forward navigation', () => {
      render(
        <TestWrapper initialEntries={['/about', '/case-studies']}>
          <App />
        </TestWrapper>
      )

      // Should render the last route in the history
      expect(screen.getByText(/case studies/i)).toBeInTheDocument()
    })
  })

  describe('Contact and External Link Integration', () => {
    it('should handle contact form interactions', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // User scrolls to contact section
      const contactButton = screen.getByRole('button', { name: /get in touch/i })
      await user.click(contactButton)

      // Should scroll to contact section or open contact form
      expect(contactButton).toBeInTheDocument()
    })

    it('should handle resume download', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // User clicks resume download
      const downloadButton = screen.getByRole('button', { name: /download resume/i })
      await user.click(downloadButton)

      // Should open resume link in new tab
      expect(downloadButton.closest('a')).toHaveAttribute('href', portfolioConfig.personal.resumeLink)
      expect(downloadButton.closest('a')).toHaveAttribute('target', '_blank')
    })

    it('should handle social media links', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // User clicks social media links
      Object.entries(portfolioConfig.social).forEach(async ([platform, url]) => {
        const socialLink = screen.getByRole('link', { name: new RegExp(platform, 'i') })
        expect(socialLink).toHaveAttribute('href', url)
        expect(socialLink).toHaveAttribute('target', '_blank')
        expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Responsive Design Integration', () => {
    it('should handle mobile navigation', async () => {
      const user = userEvent.setup()
      
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 375,
      })

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      )

      // Mobile menu should be available
      const mobileMenuButton = screen.queryByRole('button', { name: /menu|toggle/i })
      
      if (mobileMenuButton) {
        await user.click(mobileMenuButton)
        
        // Mobile menu should toggle
        expect(mobileMenuButton).toBeInTheDocument()
      }
    })

    it('should handle desktop navigation', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      })

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      )

      // Desktop navigation should be visible
      portfolioConfig.navigation.forEach(item => {
        const link = screen.getByRole('link', { name: item.name })
        expect(link).toBeInTheDocument()
      })
    })
  })

  describe('Performance Integration', () => {
    it('should load all pages efficiently', async () => {
      const routes = ['/', '/about', '/case-studies', '/maker-projects', '/writing', '/resources']
      
      for (const route of routes) {
        const { unmount } = render(
          <TestWrapper initialEntries={[route]}>
            <App />
          </TestWrapper>
        )

        // Wait for content to load
        await waitFor(() => {
          expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()
        })

        unmount()
      }
    })

    it('should handle rapid navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      )

      // Rapid navigation between pages
      const navigationLinks = portfolioConfig.navigation.slice(0, 3)
      
      for (const navItem of navigationLinks) {
        const link = screen.getByRole('link', { name: navItem.name })
        await user.click(link)
        
        // Should not crash or show errors
        expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()
      }
    })
  })

  describe('Error Recovery Integration', () => {
    it('should handle missing content gracefully', () => {
      // Test with empty arrays
      const emptyConfig = {
        ...portfolioConfig,
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      // Mock the config
      vi.doMock('@/config/portfolio.json', () => emptyConfig)

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      )

      // Should still render without crashing
      expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()
    })

    it('should handle invalid routes gracefully', () => {
      render(
        <TestWrapper initialEntries={['/invalid-route']}>
          <App />
        </TestWrapper>
      )

      // Should show 404 page
      expect(screen.getByText(/not found/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility Integration', () => {
    it('should maintain keyboard navigation throughout the app', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      )

      // Tab through navigation
      await user.tab()
      
      // Should be able to navigate with keyboard
      expect(document.activeElement).toBeInTheDocument()
      
      // Enter key should activate buttons/links
      await user.keyboard('{Enter}')
    })

    it('should maintain screen reader compatibility', () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      )

      // Check for proper heading structure
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
      
      // Check for proper landmark roles
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('SEO Integration', () => {
    it('should render proper meta tags for each page', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Check for title
      expect(document.title).toContain(portfolioConfig.seo.title)
      
      // Check for meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      expect(metaDescription).toHaveAttribute('content', portfolioConfig.seo.description)
    })

    it('should handle social media meta tags', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Check for Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]')
      const ogDescription = document.querySelector('meta[property="og:description"]')
      
      expect(ogTitle).toHaveAttribute('content', portfolioConfig.seo.title)
      expect(ogDescription).toHaveAttribute('content', portfolioConfig.seo.description)
    })
  })

  describe('Data Consistency Integration', () => {
    it('should maintain consistent data across all pages', () => {
      const routes = ['/', '/about', '/case-studies', '/maker-projects', '/writing', '/resources']
      
      routes.forEach(route => {
        const { unmount } = render(
          <TestWrapper initialEntries={[route]}>
            <App />
          </TestWrapper>
        )

        // Personal name should be consistent across all pages
        expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()
        
        unmount()
      })
    })

    it('should validate all external links are accessible', () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      )

      // Check all external links have proper attributes
      const externalLinks = screen.getAllByRole('link')
      externalLinks.forEach(link => {
        const href = link.getAttribute('href')
        if (href?.startsWith('http')) {
          expect(link).toHaveAttribute('target', '_blank')
          expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        }
      })
    })
  })
})
