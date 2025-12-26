import { type SchemaTypeDefinition } from 'sanity'

import personal from './personal'
import focusArea from './focusArea'
import project from './project'
import socialLink from './socialLink'

export const schemaTypes: SchemaTypeDefinition[] = [
  personal,
  focusArea,
  project,
  socialLink,
]
