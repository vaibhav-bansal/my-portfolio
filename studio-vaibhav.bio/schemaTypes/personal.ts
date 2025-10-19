import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'personal',
  title: 'Personal Information',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short professional tagline (e.g., "Product Manager")'
    }),
    defineField({
      name: 'heroMessage',
      title: 'Hero Message',
      type: 'text',
      rows: 4,
      description: 'Main headline message for the landing page'
    }),
    defineField({
      name: 'summary',
      title: 'Professional Summary',
      type: 'text',
      rows: 3,
      description: 'Brief professional summary paragraph'
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline'
    }
  }
})
