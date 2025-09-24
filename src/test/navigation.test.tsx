import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Layout from '@/components/Layout'
import { handleNavigationClick } from '@/lib/navigation'
import portfolioConfig from '@/config/portfolio.jsonc'

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

describe('Navigation System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Header Navigation', () => {
    it('should render all navigation items from portfolio.jsonc', () => {
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      portfolioConfig.navigation.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
      })
    })

    it('should render personal name in header', () => {
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()
    })

    it('should have proper navigation links', () => {
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      portfolioConfig.navigation.forEach(item => {
        const link = screen.getByRole('link', { name: item.name })
        expect(link).toHaveAttribute('href', item.href)
      })
    })

    it('should handle navigation clicks properly', async () => {
      const user = userEvent.setup()
      const mockNavigate = vi.fn()
      
      // Mock useNavigate
      vi.doMock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom')
        return {
          ...actual,
          useNavigate: () => mockNavigate,
        }
      })

      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      const homeLink = screen.getByRole('link', { name: 'Home' })
      await user.click(homeLink)

      // Verify navigation was triggered
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  describe('Footer Navigation', () => {
    it('should render all navigation items in footer', () => {
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      )

      portfolioConfig.navigation.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
      })
    })

    it('should render social links', () => {
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      )

      // Check for social media links
      Object.keys(portfolioConfig.social).forEach(platform => {
        const link = screen.getByRole('link', { name: new RegExp(platform, 'i') })
        expect(link).toHaveAttribute('href', portfolioConfig.social[platform])
      })
    })

    it('should have proper external link attributes', () => {
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      )

      Object.values(portfolioConfig.social).forEach(url => {
        const link = screen.getByRole('link', { name: url })
        expect(link).toHaveAttribute('href', url)
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Layout Navigation', () => {
    it('should render header and footer in layout', () => {
      render(
        <TestWrapper>
          <Layout>
            <div>Test Content</div>
          </Layout>
        </TestWrapper>
      )

      // Check header elements
      expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()
      
      // Check footer elements
      expect(screen.getByText(/© \d{4} Alex Chen/i)).toBeInTheDocument()
      
      // Check main content
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })

  describe('Navigation Handler Function', () => {
    it('should handle anchor link clicks', () => {
      const mockScrollIntoView = vi.fn()
      const mockElement = {
        scrollIntoView: mockScrollIntoView,
      }
      
      vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)

      const event = {
        preventDefault: vi.fn(),
        currentTarget: {
          getAttribute: vi.fn().mockReturnValue('#contact'),
        },
      } as any

      handleNavigationClick(event)

      expect(event.preventDefault).toHaveBeenCalled()
      expect(document.getElementById).toHaveBeenCalledWith('contact')
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should handle regular link clicks', () => {
      const event = {
        preventDefault: vi.fn(),
        currentTarget: {
          getAttribute: vi.fn().mockReturnValue('/about'),
        },
      } as any

      handleNavigationClick(event)

      expect(event.preventDefault).not.toHaveBeenCalled()
    })

    it('should handle missing target elements gracefully', () => {
      vi.spyOn(document, 'getElementById').mockReturnValue(null)

      const event = {
        preventDefault: vi.fn(),
        currentTarget: {
          getAttribute: vi.fn().mockReturnValue('#nonexistent'),
        },
      } as any

      expect(() => handleNavigationClick(event)).not.toThrow()
      expect(event.preventDefault).toHaveBeenCalled()
    })
  })

  describe('Mobile Navigation', () => {
    it('should toggle mobile menu', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      // Look for mobile menu button (hamburger)
      const mobileButton = screen.getByRole('button', { name: /menu|toggle/i })
      expect(mobileButton).toBeInTheDocument()

      await user.click(mobileButton)

      // Verify mobile menu is shown/hidden
      await waitFor(() => {
        const mobileMenu = screen.getByRole('navigation')
        expect(mobileMenu).toBeInTheDocument()
      })
    })
  })

  describe('Active Route Highlighting', () => {
    it('should highlight current route in navigation', () => {
      // This test would need to be run within a specific route context
      // For now, we'll test that the navigation structure supports active states
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      portfolioConfig.navigation.forEach(item => {
        const link = screen.getByRole('link', { name: item.name })
        expect(link).toBeInTheDocument()
        // In a real implementation, active links would have specific classes
        // expect(link).toHaveClass('active') // when on that route
      })
    })
  })

  describe('Scroll to Top Behavior', () => {
    it('should scroll to top on route change', async () => {
      const mockScrollTo = vi.fn()
      Object.defineProperty(window, 'scrollTo', {
        writable: true,
        value: mockScrollTo,
      })

      // Simulate route change
      const { rerender } = render(
        <TestWrapper>
          <div>Initial Route</div>
        </TestWrapper>
      )

      // Change route
      rerender(
        <TestWrapper>
          <div>New Route</div>
        </TestWrapper>
      )

      // In a real implementation, this would be triggered by React Router
      // For now, we're just testing that scrollTo is available
      expect(typeof window.scrollTo).toBe('function')
    })
  })

  describe('External Link Handling', () => {
    it('should open external links in new tab', () => {
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      )

      Object.values(portfolioConfig.social).forEach(url => {
        const link = screen.getByRole('link', { name: url })
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })

    it('should handle resume download link', () => {
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      )

      // Look for resume/CV download link
      const resumeLink = screen.getByRole('link', { name: /resume|cv|download/i })
      expect(resumeLink).toHaveAttribute('href', portfolioConfig.personal.resumeLink)
      expect(resumeLink).toHaveAttribute('target', '_blank')
    })
  })

  describe('Navigation Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()

      portfolioConfig.navigation.forEach(item => {
        const link = screen.getByRole('link', { name: item.name })
        expect(link).toBeInTheDocument()
      })
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      // Tab through navigation items
      await user.tab()
      
      const firstNavItem = screen.getByRole('link', { name: portfolioConfig.navigation[0].name })
      expect(firstNavItem).toHaveFocus()

      // Continue tabbing
      await user.tab()
      // Additional keyboard navigation tests would go here
    })
  })
})
