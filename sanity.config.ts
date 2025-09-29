import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schema'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'portfolio-studio',
  title: 'Portfolio Studio',
  
  projectId,
  dataset,
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema,
})