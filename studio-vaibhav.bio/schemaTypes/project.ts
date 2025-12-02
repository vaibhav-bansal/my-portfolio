import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle/Metric',
      type: 'string',
      description: 'Key metric or achievement (e.g., "Increased conversion by 45%")'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ]
        },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Skills or technologies used in this project'
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
      description: 'Link to project details or live demo'
    }),
    defineField({
      name: 'color',
      title: 'Card Color',
      type: 'string',
      description: 'CSS color value for the project card background',
      validation: Rule => Rule.regex(/^hsl\([0-9]+ [0-9]+% [0-9]+%\)$/, {
        name: 'HSL color',
        invert: false
      }).error('Please use HSL color format like: hsl(200 70% 60%)')
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this project appears (lower numbers first). Must be unique.',
      validation: Rule => Rule
        .required()
        .min(0)
        .integer()
        .custom(async (order, context) => {
          if (order == null) {
            return 'Display order is required';
          }
          
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2023-05-03' });
          
          // Check if another project has the same order
          const existingProjects = await client.fetch(
            `*[_type == "project" && order == $order && _id != $id]`,
            { order, id: document._id }
          );
          
          if (existingProjects.length > 0) {
            return `Display order ${order} is already used by another project. Please choose a unique number.`;
          }
          
          return true;
        })
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on the homepage',
      initialValue: false
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image'
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
