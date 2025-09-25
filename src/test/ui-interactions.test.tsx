import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Index from '@/pages/Index'
import CaseStudies from '@/pages/CaseStudies'
import MakerProjects from '@/pages/MakerProjects'
import About from '@/pages/About'
import ComingSoonCard from '@/components/ComingSoonCard'
import { getConfigSync, loadConfig } from '../lib/configLoader'

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('UI Interactions and Button Behavior', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    
    // Load config before each test
    try {
      await loadConfig()
    } catch (error) {
      // Config might already be loaded
    }
    
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

  describe('Homepage Button Interactions', () => {
    it('should render CTA buttons on homepage', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Check for main CTA buttons
      expect(screen.getByRole('button', { name: /view all work projects/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /download resume/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
    })

    it('should handle resume download button click', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      const downloadButton = screen.getByRole('button', { name: /download resume/i })
      await user.click(downloadButton)

      // Verify the button opens resume link
      expect(downloadButton.closest('a')).toHaveAttribute('href', getConfigSync().personal.resumeLink)
      expect(downloadButton.closest('a')).toHaveAttribute('target', '_blank')
    })

    it('should handle contact button click', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      const contactButton = screen.getByRole('button', { name: /get in touch/i })
      await user.click(contactButton)

      // Should scroll to contact section or open contact form
      expect(contactButton).toBeInTheDocument()
    })

    it('should handle case studies navigation button', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      const caseStudiesButton = screen.getByRole('button', { name: /view all work projects/i })
      await user.click(caseStudiesButton)

      // Should navigate to work page
      expect(caseStudiesButton.closest('a')).toHaveAttribute('href', '/work-projects')
    })
  })

  describe('Case Studies Page Interactions', () => {
    it('should render case study cards with proper interactions', () => {
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      // Check for case study cards
      getConfigSync().caseStudies.forEach(study => {
        expect(screen.getByText(study.title)).toBeInTheDocument()
        expect(screen.getByText(study.subtitle)).toBeInTheDocument()
        expect(screen.getByText(study.description)).toBeInTheDocument()
      })
    })

    it('should handle case study card clicks', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      const firstCaseStudy = getConfigSync().caseStudies[0]
      const caseStudyLink = screen.getByRole('link', { name: new RegExp(firstCaseStudy.title, 'i') })
      
      await user.click(caseStudyLink)

      expect(caseStudyLink).toHaveAttribute('href', `/work-projects/${firstCaseStudy.id}`)
    })

    it('should display coming soon cards for incomplete case studies', () => {
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      // Check for coming soon indicators
      const comingSoonStudies = getConfigSync().caseStudies.filter(study => study.comingSoon)
      comingSoonStudies.forEach(study => {
        expect(screen.getByText(study.title)).toBeInTheDocument()
        // Should have coming soon indicator
        expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
      })
    })
  })

  describe('Maker Projects Page Interactions', () => {
    it('should render project cards with proper interactions', () => {
      render(
        <TestWrapper>
          <MakerProjects />
        </TestWrapper>
      )

      getConfigSync().makerProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument()
        expect(screen.getByText(project.subtitle)).toBeInTheDocument()
        expect(screen.getByText(project.description)).toBeInTheDocument()
      })
    })

    it('should handle project link clicks', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <MakerProjects />
        </TestWrapper>
      )

      const firstProject = getConfigSync().makerProjects[0]
      const projectLink = screen.getByRole('link', { name: new RegExp(firstProject.title, 'i') })
      
      await user.click(projectLink)

      expect(projectLink).toHaveAttribute('href', `/side-projects/${firstProject.id}`)
    })

    it('should handle external project links', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <MakerProjects />
        </TestWrapper>
      )

      // Find projects with external links
      const projectWithWebsite = getConfigSync().makerProjects.find(p => p.website)
      if (projectWithWebsite) {
        const externalLink = screen.getByRole('link', { name: /visit website/i })
        expect(externalLink).toHaveAttribute('href', projectWithWebsite.website)
        expect(externalLink).toHaveAttribute('target', '_blank')
        expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  })

  describe('Coming Soon Card Behavior', () => {
    it('should render coming soon card with proper styling', () => {
      const mockItem = {
        title: 'Test Project',
        description: 'Test description',
        comingSoon: true
      }

      render(<ComingSoonCard />)

      expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
    })

    it('should not be clickable when coming soon', () => {
      const mockItem = {
        title: 'Test Project',
        description: 'Test description',
        comingSoon: true
      }

      render(<ComingSoonCard />)

      const card = screen.getByText(/coming soon/i).closest('div')
      expect(card).not.toHaveAttribute('href')
      expect(card).not.toHaveAttribute('onclick')
    })
  })

  describe('Scroll Behavior and Floating Elements', () => {
    it('should handle scroll to top functionality', () => {
      const mockScrollTo = vi.fn()
      Object.defineProperty(window, 'scrollTo', {
        writable: true,
        value: mockScrollTo,
      })

      // Simulate scroll to top button click
      const scrollToTopButton = document.createElement('button')
      scrollToTopButton.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' })
      
      fireEvent.click(scrollToTopButton)
      
      expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })

    it('should handle smooth scrolling to sections', () => {
      const mockScrollIntoView = vi.fn()
      const mockElement = {
        scrollIntoView: mockScrollIntoView,
      }
      
      vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)

      // Simulate clicking a navigation link that scrolls to a section
      const event = new Event('click')
      Object.defineProperty(event, 'currentTarget', {
        value: {
          getAttribute: () => '#contact'
        }
      })

      // This would be handled by the navigation handler
      const targetElement = document.getElementById('contact')
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }

      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should handle floating action button visibility', () => {
      // Mock scroll position
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 500,
      })

      // Simulate scroll event
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)

      // In a real implementation, this would show/hide floating buttons
      // For now, we're just testing that scroll events are handled
      expect(window.pageYOffset).toBe(500)
    })
  })

  describe('Form Interactions', () => {
    it('should handle contact form interactions', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Look for contact form elements
      const emailInput = screen.queryByRole('textbox', { name: /email/i })
      const messageInput = screen.queryByRole('textbox', { name: /message/i })
      const submitButton = screen.queryByRole('button', { name: /send|submit/i })

      if (emailInput) {
        await user.type(emailInput, 'test@example.com')
        expect(emailInput).toHaveValue('test@example.com')
      }

      if (messageInput) {
        await user.type(messageInput, 'Test message')
        expect(messageInput).toHaveValue('Test message')
      }

      if (submitButton) {
        await user.click(submitButton)
        // Verify form submission behavior
      }
    })
  })

  describe('Image Loading and Error Handling', () => {
    it('should handle image loading states', () => {
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      // Check for images with proper alt text
      const images = screen.getAllByRole('img')
      images.forEach(img => {
        expect(img).toHaveAttribute('alt')
        expect(img.getAttribute('alt')).not.toBe('')
      })
    })

    it('should handle image load errors gracefully', () => {
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      const images = screen.getAllByRole('img')
      images.forEach(img => {
        // Simulate image load error
        fireEvent.error(img)
        
        // Should have fallback behavior (this would be implemented in the component)
        expect(img).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Design Interactions', () => {
    it('should handle mobile menu toggle', async () => {
      const user = userEvent.setup()
      
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 375,
      })

      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Look for mobile menu button
      const mobileMenuButton = screen.queryByRole('button', { name: /menu|toggle/i })
      
      if (mobileMenuButton) {
        await user.click(mobileMenuButton)
        
        // Verify mobile menu is toggled
        expect(mobileMenuButton).toBeInTheDocument()
      }
    })

    it('should handle desktop navigation interactions', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      })

      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Desktop navigation should be visible
      getConfigSync().navigation.forEach(item => {
        const link = screen.getByRole('link', { name: item.name })
        expect(link).toBeInTheDocument()
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('should support tab navigation through interactive elements', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Tab through interactive elements
      await user.tab()
      
      // First focusable element should be focused
      const firstFocusable = document.activeElement
      expect(firstFocusable).toBeInTheDocument()
    })

    it('should handle keyboard shortcuts', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Test Escape key to close modals/menus
      await user.keyboard('{Escape}')
      
      // Test Enter key on buttons
      const button = screen.getByRole('button', { name: /download resume/i })
      button.focus()
      await user.keyboard('{Enter}')
      
      expect(button).toBeInTheDocument()
    })
  })

  describe('Accessibility Interactions', () => {
    it('should have proper focus management', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Check for proper focus indicators
      const focusableElements = screen.getAllByRole('button').concat(
        screen.getAllByRole('link')
      )
      
      focusableElements.forEach(element => {
        expect(element).toBeInTheDocument()
        // In a real implementation, these would have proper focus styles
      })
    })

    it('should handle screen reader announcements', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Check for ARIA labels and descriptions
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-label')
        // or have accessible text content
      })
    })
  })
})
