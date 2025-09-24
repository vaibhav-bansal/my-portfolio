import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getConfig, loadConfig, resetConfig } from '@/lib/configLoader'
import { validatePortfolioConfig, getConfigValue } from '@/lib/configValidation'

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

// Component that throws an error
const ErrorComponent = () => {
  throw new Error('Test error')
}

// Component that uses config loader
const ConfigComponent = () => {
  const config = getConfig()
  return <div>{config.personal.name}</div>
}

describe('Error Handling and Edge Cases', () => {
  beforeEach(() => {
    resetConfig()
    vi.clearAllMocks()
  })

  describe('Configuration Error Handling', () => {
    it('should throw error when portfolio.jsonc is missing', () => {
      // Mock require to simulate missing file
      const originalRequire = require
      vi.doMock('@/config/portfolio.jsoncc', () => {
        throw new Error('Cannot resolve module')
      })

      expect(() => {
        loadConfig()
      }).toThrow('CRITICAL ERROR: portfolio.jsonc file is missing')
    })

    it('should throw error when portfolio.jsonc has invalid JSON', () => {
      // Mock require to simulate invalid JSON
      vi.doMock('@/config/portfolio.jsonc', () => {
        throw new Error('JSON parse error')
      })

      expect(() => {
        loadConfig()
      }).toThrow('CRITICAL ERROR: portfolio.jsonc contains invalid JSONC syntax')
    })

    it('should throw error when required personal information is missing', () => {
      const invalidConfig = {
        personal: {
          // Missing required fields
          name: 'Test',
          // Missing: title, tagline, etc.
        },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      vi.doMock('@/config/portfolio.jsoncc', () => invalidConfig)

      expect(() => {
        getConfig()
        }).toThrow('CRITICAL ERROR: portfolio.jsoncc is missing required personal information')
    })

    it('should throw error when caseStudies array is missing', () => {
      const invalidConfig = {
        personal: {
          name: 'Test',
          title: 'Test Title',
          tagline: 'Test Tagline',
          location: 'Test Location',
          email: 'test@example.com',
          phone: '+1234567890',
          resumeLink: 'https://example.com/resume',
          bio: 'Test bio',
          yearsExperience: 5,
          currentRole: 'Test Role',
          domains: ['Test'],
          metrics: { test: 'test' },
          background: { intro: 'Test' }
        },
        // Missing caseStudies array
        makerProjects: [],
        writing: [],
        resources: []
      }

      vi.doMock('@/config/portfolio.jsoncc', () => invalidConfig)

      expect(() => {
        getConfig()
        }).toThrow('CRITICAL ERROR: portfolio.jsoncc is missing or has invalid caseStudies array')
    })

    it('should throw error when accessing non-existent config property', () => {
      const validConfig = {
        personal: { name: 'Test' },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      expect(() => {
        getConfigValue(validConfig, 'nonExistent.property')
      }).toThrow('CRITICAL ERROR: Required property \'nonExistent.property\' is missing')
    })

    it('should handle nested property access errors', () => {
      const validConfig = {
        personal: { name: 'Test' },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      expect(() => {
        getConfigValue(validConfig, 'personal.nonExistent')
      }).toThrow('CRITICAL ERROR: Required property \'personal.nonExistent\' is missing')
    })
  })

  describe('Error Boundary Component', () => {
    it('should catch and display errors', () => {
      render(
        <TestWrapper>
          <ErrorBoundary>
            <ErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      )

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('We\'re sorry, but something unexpected happened. Please try refreshing the page.')).toBeInTheDocument()
    })

    it('should provide retry functionality', () => {
      render(
        <TestWrapper>
          <ErrorBoundary>
            <ErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      )

      const retryButton = screen.getByRole('button', { name: /try again/i })
      const refreshButton = screen.getByRole('button', { name: /refresh page/i })

      expect(retryButton).toBeInTheDocument()
      expect(refreshButton).toBeInTheDocument()
    })

    it('should show error details in development mode', () => {
      // Mock development environment
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'

      render(
        <TestWrapper>
          <ErrorBoundary>
            <ErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      )

      expect(screen.getByText('Error Details (Development)')).toBeInTheDocument()

      // Restore environment
      process.env.NODE_ENV = originalEnv
    })

    it('should use custom fallback when provided', () => {
      const customFallback = <div>Custom Error Message</div>

      render(
        <TestWrapper>
          <ErrorBoundary fallback={customFallback}>
            <ErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      )

      expect(screen.getByText('Custom Error Message')).toBeInTheDocument()
    })
  })

  describe('Component Error Scenarios', () => {
    it('should handle config loading errors in components', () => {
      // Mock config loading to throw error
      vi.doMock('@/lib/configLoader', () => ({
        getConfig: () => {
          throw new Error('Config loading failed')
        }
      }))

      render(
        <TestWrapper>
          <ErrorBoundary>
            <ConfigComponent />
          </ErrorBoundary>
        </TestWrapper>
      )

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('should handle missing image assets gracefully', () => {
      render(
        <TestWrapper>
          <ErrorBoundary>
            <img src="/non-existent-image.jpg" alt="Test" />
          </ErrorBoundary>
        </TestWrapper>
      )

      const img = screen.getByRole('img')
      
      // Simulate image load error
      fireEvent.error(img)
      
      // Should handle error gracefully without crashing
      expect(img).toBeInTheDocument()
    })

    it('should handle network errors for external resources', () => {
      // Mock fetch to simulate network error
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      render(
        <TestWrapper>
          <ErrorBoundary>
            <div>Content that might fetch external resources</div>
          </ErrorBoundary>
        </TestWrapper>
      )

      expect(screen.getByText('Content that might fetch external resources')).toBeInTheDocument()
    })
  })

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle empty strings in config', () => {
      const configWithEmptyStrings = {
        personal: {
          name: '',
          title: 'Test Title',
          tagline: 'Test Tagline',
          location: 'Test Location',
          email: 'test@example.com',
          phone: '+1234567890',
          resumeLink: 'https://example.com/resume',
          bio: 'Test bio',
          yearsExperience: 5,
          currentRole: 'Test Role',
          domains: ['Test'],
          metrics: { test: 'test' },
          background: { intro: 'Test' }
        },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      expect(() => {
        getConfigValue(configWithEmptyStrings, 'personal.name')
      }).not.toThrow()

      const name = getConfigValue(configWithEmptyStrings, 'personal.name')
      expect(name).toBe('')
    })

    it('should handle null and undefined values', () => {
      const configWithNulls = {
        personal: {
          name: null,
          title: 'Test Title',
          tagline: 'Test Tagline',
          location: 'Test Location',
          email: 'test@example.com',
          phone: '+1234567890',
          resumeLink: 'https://example.com/resume',
          bio: 'Test bio',
          yearsExperience: 5,
          currentRole: 'Test Role',
          domains: ['Test'],
          metrics: { test: 'test' },
          background: { intro: 'Test' }
        },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      expect(() => {
        getConfigValue(configWithNulls, 'personal.name')
      }).not.toThrow()

      const name = getConfigValue(configWithNulls, 'personal.name')
      expect(name).toBeNull()
    })

    it('should handle very large content', () => {
      const largeContent = 'x'.repeat(10000)
      const configWithLargeContent = {
        personal: {
          name: 'Test',
          title: 'Test Title',
          tagline: 'Test Tagline',
          location: 'Test Location',
          email: 'test@example.com',
          phone: '+1234567890',
          resumeLink: 'https://example.com/resume',
          bio: largeContent,
          yearsExperience: 5,
          currentRole: 'Test Role',
          domains: ['Test'],
          metrics: { test: 'test' },
          background: { intro: 'Test' }
        },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      expect(() => {
        getConfigValue(configWithLargeContent, 'personal.bio')
      }).not.toThrow()

      const bio = getConfigValue(configWithLargeContent, 'personal.bio')
      expect(bio).toBe(largeContent)
    })

    it('should handle special characters in content', () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      const configWithSpecialChars = {
        personal: {
          name: specialChars,
          title: 'Test Title',
          tagline: 'Test Tagline',
          location: 'Test Location',
          email: 'test@example.com',
          phone: '+1234567890',
          resumeLink: 'https://example.com/resume',
          bio: 'Test bio',
          yearsExperience: 5,
          currentRole: 'Test Role',
          domains: ['Test'],
          metrics: { test: 'test' },
          background: { intro: 'Test' }
        },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      expect(() => {
        getConfigValue(configWithSpecialChars, 'personal.name')
      }).not.toThrow()

      const name = getConfigValue(configWithSpecialChars, 'personal.name')
      expect(name).toBe(specialChars)
    })

    it('should handle Unicode characters', () => {
      const unicodeContent = '🚀 Test with emojis and 中文 characters'
      const configWithUnicode = {
        personal: {
          name: unicodeContent,
          title: 'Test Title',
          tagline: 'Test Tagline',
          location: 'Test Location',
          email: 'test@example.com',
          phone: '+1234567890',
          resumeLink: 'https://example.com/resume',
          bio: 'Test bio',
          yearsExperience: 5,
          currentRole: 'Test Role',
          domains: ['Test'],
          metrics: { test: 'test' },
          background: { intro: 'Test' }
        },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      expect(() => {
        getConfigValue(configWithUnicode, 'personal.name')
      }).not.toThrow()

      const name = getConfigValue(configWithUnicode, 'personal.name')
      expect(name).toBe(unicodeContent)
    })
  })

  describe('Validation Error Handling', () => {
    it('should reject invalid case study structure', () => {
      const invalidCaseStudy = {
        // Missing required fields
        title: 'Test',
        // Missing: id, subtitle, description, etc.
      }

      expect(validatePortfolioConfig({ 
        personal: { name: 'Test' },
        caseStudies: [invalidCaseStudy],
        makerProjects: [],
        writing: [],
        resources: []
      })).toBe(false)
    })

    it('should handle malformed URLs', () => {
      const configWithMalformedUrls = {
        personal: {
          name: 'Test',
          title: 'Test Title',
          tagline: 'Test Tagline',
          location: 'Test Location',
          email: 'test@example.com',
          phone: '+1234567890',
          resumeLink: 'not-a-valid-url',
          bio: 'Test bio',
          yearsExperience: 5,
          currentRole: 'Test Role',
          domains: ['Test'],
          metrics: { test: 'test' },
          background: { intro: 'Test' }
        },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      // Should not throw error, but URL validation would be handled elsewhere
      expect(() => {
        getConfigValue(configWithMalformedUrls, 'personal.resumeLink')
      }).not.toThrow()
    })

    it('should handle invalid data types', () => {
      const configWithInvalidTypes = {
        personal: {
          name: 123, // Should be string
          title: 'Test Title',
          tagline: 'Test Tagline',
          location: 'Test Location',
          email: 'test@example.com',
          phone: '+1234567890',
          resumeLink: 'https://example.com/resume',
          bio: 'Test bio',
          yearsExperience: 'five', // Should be number
          currentRole: 'Test Role',
          domains: ['Test'],
          metrics: { test: 'test' },
          background: { intro: 'Test' }
        },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      // Should not throw error, but type validation would be handled elsewhere
      expect(() => {
        getConfigValue(configWithInvalidTypes, 'personal.name')
      }).not.toThrow()
    })
  })

  describe('Performance and Memory Edge Cases', () => {
    it('should handle rapid config access', () => {
      const config = {
        personal: { name: 'Test' },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }

      // Rapid successive calls
      for (let i = 0; i < 1000; i++) {
        expect(() => {
          getConfigValue(config, 'personal.name')
        }).not.toThrow()
      }
    })

    it('should handle deep nested property access', () => {
      const deepConfig = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  value: 'deep value'
                }
              }
            }
          }
        }
      }

      expect(() => {
        getConfigValue(deepConfig, 'level1.level2.level3.level4.level5.value')
      }).not.toThrow()

      const value = getConfigValue(deepConfig, 'level1.level2.level3.level4.level5.value')
      expect(value).toBe('deep value')
    })

    it('should handle circular references gracefully', () => {
      const circularConfig: any = {
        personal: { name: 'Test' },
        caseStudies: [],
        makerProjects: [],
        writing: [],
        resources: []
      }
      
      // Create circular reference
      circularConfig.personal.self = circularConfig

      // Should not cause infinite loop
      expect(() => {
        getConfigValue(circularConfig, 'personal.name')
      }).not.toThrow()
    })
  })
})
