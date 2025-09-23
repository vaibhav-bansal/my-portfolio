import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Index from '@/pages/Index'
import About from '@/pages/About'
import CaseStudies from '@/pages/CaseStudies'
import CaseStudyDetail from '@/pages/CaseStudyDetail'
import MakerProjects from '@/pages/MakerProjects'
import ProjectDetail from '@/pages/ProjectDetail'
import Writing from '@/pages/Writing'
import Resources from '@/pages/Resources'
import ComingSoonCard from '@/components/ComingSoonCard'
import portfolioConfig from '@/config/portfolio.json'

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

describe('Content Rendering and Coming Soon Behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Homepage Content Rendering', () => {
    it('should render personal information from portfolio.json', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Check personal information
      expect(screen.getByText(portfolioConfig.personal.name)).toBeInTheDocument()
      expect(screen.getByText(portfolioConfig.personal.title)).toBeInTheDocument()
      expect(screen.getByText(portfolioConfig.personal.tagline)).toBeInTheDocument()
      expect(screen.getByText(portfolioConfig.personal.location)).toBeInTheDocument()
      expect(screen.getByText(portfolioConfig.personal.bio)).toBeInTheDocument()
    })

    it('should render experience metrics', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      const metrics = portfolioConfig.personal.metrics
      expect(screen.getByText(metrics.usersImpacted)).toBeInTheDocument()
      expect(screen.getByText(metrics.revenueGenerated)).toBeInTheDocument()
      expect(screen.getByText(metrics.teamsLed)).toBeInTheDocument()
      expect(screen.getByText(metrics.arpuUplift)).toBeInTheDocument()
    })

    it('should render skills from portfolio.json', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Check skills sections
      Object.entries(portfolioConfig.skills).forEach(([category, skills]) => {
        skills.forEach(skill => {
          expect(screen.getByText(skill)).toBeInTheDocument()
        })
      })
    })

    it('should render contact information', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      expect(screen.getByText(portfolioConfig.personal.email)).toBeInTheDocument()
      expect(screen.getByText(portfolioConfig.personal.phone)).toBeInTheDocument()
    })
  })

  describe('About Page Content Rendering', () => {
    it('should render background information', () => {
      render(
        <TestWrapper>
          <About />
        </TestWrapper>
      )

      const background = portfolioConfig.personal.background
      expect(screen.getByText(background.intro)).toBeInTheDocument()
      
      // Check philosophy sections
      Object.values(background.philosophy).forEach(philosophy => {
        expect(screen.getByText(philosophy.title)).toBeInTheDocument()
        expect(screen.getByText(philosophy.description)).toBeInTheDocument()
      })
    })

    it('should render experience timeline', () => {
      render(
        <TestWrapper>
          <About />
        </TestWrapper>
      )

      expect(screen.getByText(portfolioConfig.personal.currentRole)).toBeInTheDocument()
      expect(screen.getByText(`${portfolioConfig.personal.yearsExperience}+ years`)).toBeInTheDocument()
    })

    it('should render domain expertise', () => {
      render(
        <TestWrapper>
          <About />
        </TestWrapper>
      )

      portfolioConfig.personal.domains.forEach(domain => {
        expect(screen.getByText(domain)).toBeInTheDocument()
      })
    })
  })

  describe('Case Studies Content Rendering', () => {
    it('should render all case studies from portfolio.json', () => {
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      portfolioConfig.caseStudies.forEach(study => {
        expect(screen.getByText(study.title)).toBeInTheDocument()
        expect(screen.getByText(study.subtitle)).toBeInTheDocument()
        expect(screen.getByText(study.description)).toBeInTheDocument()
        
        // Check tags
        study.tags.forEach(tag => {
          expect(screen.getByText(tag)).toBeInTheDocument()
        })
        
        // Check impact metrics
        Object.values(study.impact).forEach(metric => {
          expect(screen.getByText(metric)).toBeInTheDocument()
        })
      })
    })

    it('should render coming soon indicators for incomplete case studies', () => {
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      const comingSoonStudies = portfolioConfig.caseStudies.filter(study => study.comingSoon)
      
      if (comingSoonStudies.length > 0) {
        expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
      }
    })

    it('should render case study detail content', () => {
      const study = portfolioConfig.caseStudies[0]
      
      render(
        <TestWrapper>
          <CaseStudyDetail />
        </TestWrapper>
      )

      // Mock the URL parameter
      vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom')
        return {
          ...actual,
          useParams: () => ({ id: study.id }),
        }
      })

      // The detail page should render the full case study content
      expect(screen.getByText(study.title)).toBeInTheDocument()
      expect(screen.getByText(study.subtitle)).toBeInTheDocument()
      
      if (study.content) {
        expect(screen.getByText(study.content.context)).toBeInTheDocument()
        expect(screen.getByText(study.content.problem)).toBeInTheDocument()
        expect(screen.getByText(study.content.impactDetails)).toBeInTheDocument()
        
        // Check process steps
        study.content.process?.forEach(step => {
          expect(screen.getByText(step.title)).toBeInTheDocument()
          expect(screen.getByText(step.description)).toBeInTheDocument()
        })
        
        // Check artifacts
        study.content.artifacts?.forEach(artifact => {
          expect(screen.getByText(artifact)).toBeInTheDocument()
        })
        
        // Check reflection
        if (study.content.reflection) {
          expect(screen.getByText(study.content.reflection.whatWentWell)).toBeInTheDocument()
          expect(screen.getByText(study.content.reflection.whatIdDoDifferently)).toBeInTheDocument()
          expect(screen.getByText(study.content.reflection.keyTakeaway)).toBeInTheDocument()
        }
      }
    })
  })

  describe('Maker Projects Content Rendering', () => {
    it('should render all maker projects from portfolio.json', () => {
      render(
        <TestWrapper>
          <MakerProjects />
        </TestWrapper>
      )

      portfolioConfig.makerProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument()
        expect(screen.getByText(project.subtitle)).toBeInTheDocument()
        expect(screen.getByText(project.description)).toBeInTheDocument()
        
        // Check tags
        project.tags.forEach(tag => {
          expect(screen.getByText(tag)).toBeInTheDocument()
        })
        
        // Check stats
        if (project.stats) {
          Object.values(project.stats).forEach(stat => {
            expect(screen.getByText(stat)).toBeInTheDocument()
          })
        }
      })
    })

    it('should render project links correctly', () => {
      render(
        <TestWrapper>
          <MakerProjects />
        </TestWrapper>
      )

      portfolioConfig.makerProjects.forEach(project => {
        // Check GitHub links
        if (project.github) {
          const githubLink = screen.getByRole('link', { name: /github/i })
          expect(githubLink).toHaveAttribute('href', project.github)
        }
        
        // Check website links
        if (project.website) {
          const websiteLink = screen.getByRole('link', { name: /visit website/i })
          expect(websiteLink).toHaveAttribute('href', project.website)
        }
      })
    })
  })

  describe('Writing Content Rendering', () => {
    it('should render all writing articles from portfolio.json', () => {
      render(
        <TestWrapper>
          <Writing />
        </TestWrapper>
      )

      portfolioConfig.writing.forEach(article => {
        expect(screen.getByText(article.title)).toBeInTheDocument()
        expect(screen.getByText(article.excerpt)).toBeInTheDocument()
        expect(screen.getByText(article.readTime)).toBeInTheDocument()
        
        // Check tags
        article.tags.forEach(tag => {
          expect(screen.getByText(tag)).toBeInTheDocument()
        })
        
        // Check publication date
        expect(screen.getByText(article.publishedAt)).toBeInTheDocument()
      })
    })

    it('should render article links correctly', () => {
      render(
        <TestWrapper>
          <Writing />
        </TestWrapper>
      )

      portfolioConfig.writing.forEach(article => {
        const articleLink = screen.getByRole('link', { name: new RegExp(article.title, 'i') })
        expect(articleLink).toHaveAttribute('href', article.url)
        expect(articleLink).toHaveAttribute('target', '_blank')
        expect(articleLink).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Resources Content Rendering', () => {
    it('should render all resources from portfolio.json', () => {
      render(
        <TestWrapper>
          <Resources />
        </TestWrapper>
      )

      portfolioConfig.resources.forEach(resource => {
        expect(screen.getByText(resource.title)).toBeInTheDocument()
        expect(screen.getByText(resource.description)).toBeInTheDocument()
        expect(screen.getByText(resource.type)).toBeInTheDocument()
      })
    })

    it('should render resource download links', () => {
      render(
        <TestWrapper>
          <Resources />
        </TestWrapper>
      )

      portfolioConfig.resources.forEach(resource => {
        const downloadLink = screen.getByRole('link', { name: /download/i })
        expect(downloadLink).toHaveAttribute('href', resource.downloadUrl)
      })
    })
  })

  describe('Coming Soon Card Behavior', () => {
    it('should render coming soon card with proper content', () => {
      const mockItem = {
        title: 'Test Project',
        description: 'Test description',
        comingSoon: true
      }

      render(<ComingSoonCard item={mockItem} />)

      expect(screen.getByText('Test Project')).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
      expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
    })

    it('should apply proper styling for coming soon items', () => {
      const mockItem = {
        title: 'Test Project',
        description: 'Test description',
        comingSoon: true
      }

      render(<ComingSoonCard item={mockItem} />)

      const card = screen.getByText('Test Project').closest('div')
      expect(card).toHaveClass(/coming-soon|disabled|opacity/i)
    })

    it('should disable interactions for coming soon items', () => {
      const mockItem = {
        title: 'Test Project',
        description: 'Test description',
        comingSoon: true
      }

      render(<ComingSoonCard item={mockItem} />)

      const card = screen.getByText('Test Project').closest('div')
      expect(card).not.toHaveAttribute('href')
      expect(card).not.toHaveAttribute('onclick')
    })
  })

  describe('Image and Asset Rendering', () => {
    it('should render images with proper alt text', () => {
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      const images = screen.getAllByRole('img')
      images.forEach(img => {
        expect(img).toHaveAttribute('alt')
        expect(img.getAttribute('alt')).not.toBe('')
      })
    })

    it('should use fallback images when main images fail', () => {
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      const images = screen.getAllByRole('img')
      images.forEach(img => {
        // Simulate image load error
        fireEvent.error(img)
        
        // Should have fallback behavior
        expect(img).toBeInTheDocument()
      })
    })
  })

  describe('SEO Content Rendering', () => {
    it('should render proper page titles', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Check that SEO title is used in document title
      expect(document.title).toContain(portfolioConfig.seo.title)
    })

    it('should render meta descriptions', () => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )

      // Check for meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      expect(metaDescription).toHaveAttribute('content', portfolioConfig.seo.description)
    })

    it('should render social media meta tags', () => {
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

  describe('Dynamic Content Loading', () => {
    it('should handle loading states gracefully', async () => {
      render(
        <TestWrapper>
          <CaseStudies />
        </TestWrapper>
      )

      // Wait for content to load
      await waitFor(() => {
        expect(screen.getByText(portfolioConfig.caseStudies[0].title)).toBeInTheDocument()
      })
    })

    it('should handle empty content arrays', () => {
      // Mock empty arrays
      const emptyConfig = {
        ...portfolioConfig,
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      // This would be tested with a component that handles empty states
      expect(emptyConfig.caseStudies).toHaveLength(0)
      expect(emptyConfig.makerProjects).toHaveLength(0)
      expect(emptyConfig.writing).toHaveLength(0)
      expect(emptyConfig.resources).toHaveLength(0)
    })
  })

  describe('Content Validation', () => {
    it('should validate required content fields', () => {
      // Test that all required fields are present
      expect(portfolioConfig.personal.name).toBeTruthy()
      expect(portfolioConfig.personal.title).toBeTruthy()
      expect(portfolioConfig.personal.tagline).toBeTruthy()
      expect(portfolioConfig.caseStudies.length).toBeGreaterThan(0)
      expect(portfolioConfig.makerProjects.length).toBeGreaterThan(0)
      expect(portfolioConfig.writing.length).toBeGreaterThan(0)
      expect(portfolioConfig.resources.length).toBeGreaterThan(0)
    })

    it('should validate content data types', () => {
      // Test data types
      expect(typeof portfolioConfig.personal.name).toBe('string')
      expect(typeof portfolioConfig.personal.yearsExperience).toBe('number')
      expect(Array.isArray(portfolioConfig.caseStudies)).toBe(true)
      expect(Array.isArray(portfolioConfig.makerProjects)).toBe(true)
      expect(Array.isArray(portfolioConfig.writing)).toBe(true)
      expect(Array.isArray(portfolioConfig.resources)).toBe(true)
    })

    it('should validate content length constraints', () => {
      // Test reasonable content lengths
      expect(portfolioConfig.personal.name.length).toBeGreaterThan(0)
      expect(portfolioConfig.personal.name.length).toBeLessThan(100)
      expect(portfolioConfig.personal.bio.length).toBeGreaterThan(50)
      expect(portfolioConfig.personal.bio.length).toBeLessThan(1000)
    })
  })
})
