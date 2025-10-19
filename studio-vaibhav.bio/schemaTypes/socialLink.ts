import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform Name',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'LinkedIn', value: 'LinkedIn' },
          { title: 'Twitter', value: 'Twitter' },
          { title: 'GitHub', value: 'GitHub' },
          { title: 'Medium', value: 'Medium' },
          { title: 'Instagram', value: 'Instagram' },
          { title: 'Dribbble', value: 'Dribbble' },
          { title: 'Behance', value: 'Behance' },
          { title: 'Other', value: 'Other' }
        ]
      }
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon identifier (e.g., "linkedin", "twitter", "github")'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this link appears (lower numbers first)',
      validation: Rule => Rule.min(0).integer()
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this social link',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
})
