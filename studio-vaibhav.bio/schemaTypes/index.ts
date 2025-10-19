import { type SchemaTypeDefinition } from 'sanity'

import personal from './personal'
import focusArea from './focusArea'
import project from './project'
import socialLink from './socialLink'
import contactSettings from './contactSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  personal,
  focusArea,
  project,
  socialLink,
  contactSettings,
]
