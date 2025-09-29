import { type SchemaTypeDefinition } from 'sanity'
import { portfolio } from './schemas/portfolio'
import { caseStudy } from './schemas/caseStudy'
import { makerProject } from './schemas/makerProject'
import { testimonial } from './schemas/testimonial'
import { article } from './schemas/article'
import { resource } from './schemas/resource'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    portfolio,
    caseStudy,
    makerProject,
    testimonial,
    article,
    resource,
  ],
}