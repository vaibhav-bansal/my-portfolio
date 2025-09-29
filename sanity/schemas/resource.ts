import { defineType, defineField } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Template', value: 'template' },
          { title: 'Framework', value: 'framework' },
          { title: 'Guide', value: 'guide' },
          { title: 'Toolkit', value: 'toolkit' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'size',
      title: 'File Size',
      type: 'string',
      description: 'e.g., "2.5 MB"',
    }),
    defineField({
      name: 'comingSoon',
      title: 'Coming Soon',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
})