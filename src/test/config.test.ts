import { describe, it, expect, beforeEach, vi } from 'vitest'
import { validatePortfolioConfig, validateCaseStudy, getConfigValue } from '@/lib/configValidation'
import { getConfig, loadConfig, resetConfig } from '@/lib/configLoader'
import portfolioConfig from '@/config/portfolio.jsonc'

describe('Portfolio Configuration Validation', () => {
  beforeEach(() => {
    resetConfig()
  })

  describe('Portfolio Config Structure', () => {
    it('should have all required top-level properties', () => {
      expect(portfolioConfig).toHaveProperty('personal')
      expect(portfolioConfig).toHaveProperty('seo')
      expect(portfolioConfig).toHaveProperty('social')
      expect(portfolioConfig).toHaveProperty('assets')
      expect(portfolioConfig).toHaveProperty('navigation')
      expect(portfolioConfig).toHaveProperty('skills')
      expect(portfolioConfig).toHaveProperty('caseStudies')
      expect(portfolioConfig).toHaveProperty('makerProjects')
      expect(portfolioConfig).toHaveProperty('writing')
      expect(portfolioConfig).toHaveProperty('resources')
    })

    it('should validate personal information structure', () => {
      const { personal } = portfolioConfig
      
      expect(personal).toHaveProperty('name')
      expect(personal).toHaveProperty('title')
      expect(personal).toHaveProperty('tagline')
      expect(personal).toHaveProperty('location')
      expect(personal).toHaveProperty('email')
      expect(personal).toHaveProperty('phone')
      expect(personal).toHaveProperty('resumeLink')
      expect(personal).toHaveProperty('bio')
      expect(personal).toHaveProperty('yearsExperience')
      expect(personal).toHaveProperty('currentRole')
      expect(personal).toHaveProperty('domains')
      expect(personal).toHaveProperty('metrics')
      expect(personal).toHaveProperty('background')
      
      // Validate data types
      expect(typeof personal.name).toBe('string')
      expect(typeof personal.title).toBe('string')
      expect(typeof personal.yearsExperience).toBe('number')
      expect(Array.isArray(personal.domains)).toBe(true)
      expect(typeof personal.metrics).toBe('object')
      expect(typeof personal.background).toBe('object')
    })

    it('should validate SEO metadata structure', () => {
      const { seo } = portfolioConfig
      
      expect(seo).toHaveProperty('title')
      expect(seo).toHaveProperty('description')
      expect(seo).toHaveProperty('keywords')
      expect(seo).toHaveProperty('author')
      expect(seo).toHaveProperty('ogImage')
      expect(seo).toHaveProperty('twitterHandle')
      
      expect(typeof seo.title).toBe('string')
      expect(typeof seo.description).toBe('string')
      expect(Array.isArray(seo.keywords)).toBe(true)
      expect(seo.keywords.length).toBeGreaterThan(0)
    })

    it('should validate social links structure', () => {
      const { social } = portfolioConfig
      
      expect(social).toHaveProperty('linkedin')
      expect(social).toHaveProperty('twitter')
      expect(social).toHaveProperty('github')
      expect(social).toHaveProperty('medium')
      
      // Validate URLs
      Object.values(social).forEach(url => {
        expect(typeof url).toBe('string')
        expect(url).toMatch(/^https?:\/\//)
      })
    })

    it('should validate navigation structure', () => {
      const { navigation } = portfolioConfig
      
      expect(Array.isArray(navigation)).toBe(true)
      expect(navigation.length).toBeGreaterThan(0)
      
      navigation.forEach(item => {
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('href')
        expect(typeof item.name).toBe('string')
        expect(typeof item.href).toBe('string')
        expect(item.href).toMatch(/^\//)
      })
    })

    it('should validate skills structure', () => {
      const { skills } = portfolioConfig
      
      expect(skills).toHaveProperty('product')
      expect(skills).toHaveProperty('technical')
      expect(skills).toHaveProperty('design')
      expect(skills).toHaveProperty('leadership')
      
      Object.values(skills).forEach(skillArray => {
        expect(Array.isArray(skillArray)).toBe(true)
        skillArray.forEach(skill => {
          expect(typeof skill).toBe('string')
          expect(skill.length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Case Studies Validation', () => {
    it('should validate case studies array structure', () => {
      const { caseStudies } = portfolioConfig
      
      expect(Array.isArray(caseStudies)).toBe(true)
      expect(caseStudies.length).toBeGreaterThan(0)
      
      caseStudies.forEach(study => {
        expect(validateCaseStudy(study)).toBe(true)
      })
    })

    it('should validate individual case study structure', () => {
      const firstStudy = portfolioConfig.caseStudies[0]
      
      expect(firstStudy).toHaveProperty('id')
      expect(firstStudy).toHaveProperty('title')
      expect(firstStudy).toHaveProperty('subtitle')
      expect(firstStudy).toHaveProperty('description')
      expect(firstStudy).toHaveProperty('image')
      expect(firstStudy).toHaveProperty('tags')
      expect(firstStudy).toHaveProperty('duration')
      expect(firstStudy).toHaveProperty('team')
      expect(firstStudy).toHaveProperty('impact')
      expect(firstStudy).toHaveProperty('content')
      
      // Validate data types
      expect(typeof firstStudy.id).toBe('string')
      expect(typeof firstStudy.title).toBe('string')
      expect(Array.isArray(firstStudy.tags)).toBe(true)
      expect(typeof firstStudy.impact).toBe('object')
      expect(typeof firstStudy.content).toBe('object')
      
      // Validate comingSoon flag
      expect(typeof firstStudy.comingSoon).toBe('boolean')
    })

    it('should validate case study content structure', () => {
      const study = portfolioConfig.caseStudies[0]
      const { content } = study
      
      expect(content).toHaveProperty('context')
      expect(content).toHaveProperty('problem')
      expect(content).toHaveProperty('process')
      expect(content).toHaveProperty('artifacts')
      expect(content).toHaveProperty('impactDetails')
      expect(content).toHaveProperty('reflection')
      
      expect(typeof content.context).toBe('string')
      expect(typeof content.problem).toBe('string')
      expect(Array.isArray(content.process)).toBe(true)
      expect(Array.isArray(content.artifacts)).toBe(true)
      expect(typeof content.impactDetails).toBe('string')
      expect(typeof content.reflection).toBe('object')
      
      // Validate reflection structure
      expect(content.reflection).toHaveProperty('whatWentWell')
      expect(content.reflection).toHaveProperty('whatIdDoDifferently')
      expect(content.reflection).toHaveProperty('keyTakeaway')
    })

    it('should validate case study process steps', () => {
      const study = portfolioConfig.caseStudies[0]
      const { process } = study.content
      
      expect(Array.isArray(process)).toBe(true)
      expect(process.length).toBeGreaterThan(0)
      
      process.forEach(step => {
        expect(step).toHaveProperty('title')
        expect(step).toHaveProperty('description')
        expect(step).toHaveProperty('weeks')
        expect(typeof step.title).toBe('string')
        expect(typeof step.description).toBe('string')
        expect(typeof step.weeks).toBe('string')
      })
    })
  })

  describe('Maker Projects Validation', () => {
    it('should validate maker projects array structure', () => {
      const { makerProjects } = portfolioConfig
      
      expect(Array.isArray(makerProjects)).toBe(true)
      expect(makerProjects.length).toBeGreaterThan(0)
      
      makerProjects.forEach(project => {
        expect(project).toHaveProperty('id')
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('subtitle')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('image')
        expect(project).toHaveProperty('tags')
        expect(project).toHaveProperty('stats')
        expect(project).toHaveProperty('comingSoon')
        
        expect(typeof project.id).toBe('string')
        expect(typeof project.title).toBe('string')
        expect(Array.isArray(project.tags)).toBe(true)
        expect(typeof project.stats).toBe('object')
        expect(typeof project.comingSoon).toBe('boolean')
      })
    })
  })

  describe('Writing Validation', () => {
    it('should validate writing array structure', () => {
      const { writing } = portfolioConfig
      
      expect(Array.isArray(writing)).toBe(true)
      expect(writing.length).toBeGreaterThan(0)
      
      writing.forEach(article => {
        expect(article).toHaveProperty('id')
        expect(article).toHaveProperty('title')
        expect(article).toHaveProperty('excerpt')
        expect(article).toHaveProperty('publishedAt')
        expect(article).toHaveProperty('readTime')
        expect(article).toHaveProperty('tags')
        expect(article).toHaveProperty('url')
        expect(article).toHaveProperty('comingSoon')
        
        expect(typeof article.id).toBe('string')
        expect(typeof article.title).toBe('string')
        expect(Array.isArray(article.tags)).toBe(true)
        expect(typeof article.url).toBe('string')
        expect(article.url).toMatch(/^https?:\/\//)
        expect(typeof article.comingSoon).toBe('boolean')
      })
    })
  })

  describe('Resources Validation', () => {
    it('should validate resources array structure', () => {
      const { resources } = portfolioConfig
      
      expect(Array.isArray(resources)).toBe(true)
      expect(resources.length).toBeGreaterThan(0)
      
      resources.forEach(resource => {
        expect(resource).toHaveProperty('title')
        expect(resource).toHaveProperty('description')
        expect(resource).toHaveProperty('type')
        expect(resource).toHaveProperty('downloadUrl')
        expect(resource).toHaveProperty('preview')
        expect(resource).toHaveProperty('comingSoon')
        
        expect(typeof resource.title).toBe('string')
        expect(typeof resource.description).toBe('string')
        expect(typeof resource.type).toBe('string')
        expect(typeof resource.downloadUrl).toBe('string')
        expect(resource.downloadUrl).toMatch(/^\//)
        expect(typeof resource.comingSoon).toBe('boolean')
      })
    })
  })

  describe('Config Loader Error Handling', () => {
    it('should throw error when accessing non-existent property', () => {
      expect(() => {
        getConfigValue(portfolioConfig, 'nonExistent.property')
      }).toThrow('CRITICAL ERROR: Required property \'nonExistent.property\' is missing')
    })

    it('should return correct value for existing property', () => {
      const name = getConfigValue(portfolioConfig, 'personal.name')
      expect(name).toBe(portfolioConfig.personal.name)
    })

    it('should validate portfolio config structure', () => {
      expect(validatePortfolioConfig(portfolioConfig)).toBe(true)
    })

    it('should reject invalid config structure', () => {
      const invalidConfig = { personal: { name: 'Test' } } // Missing required fields
      expect(validatePortfolioConfig(invalidConfig)).toBe(false)
    })
  })

  describe('Assets Configuration', () => {
    it('should validate assets structure', () => {
      const { assets } = portfolioConfig
      
      expect(assets).toHaveProperty('fallbackImage')
      expect(assets).toHaveProperty('defaultImageAlt')
      expect(assets).toHaveProperty('loadingStates')
      
      expect(typeof assets.fallbackImage).toBe('string')
      expect(assets.fallbackImage).toMatch(/^\//)
      expect(typeof assets.defaultImageAlt).toBe('string')
      expect(typeof assets.loadingStates).toBe('object')
      
      expect(assets.loadingStates).toHaveProperty('enabled')
      expect(assets.loadingStates).toHaveProperty('placeholder')
      expect(typeof assets.loadingStates.enabled).toBe('boolean')
      expect(typeof assets.loadingStates.placeholder).toBe('string')
    })
  })
})
