import { defineType, defineField } from 'sanity'

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'personal',
      title: 'Personal Information',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'title', title: 'Job Title', type: 'string' },
        { name: 'tagline', title: 'Tagline', type: 'string' },
        { name: 'location', title: 'Location', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'resumeLink', title: 'Resume Link', type: 'url' },
        { name: 'bio', title: 'Bio', type: 'text' },
        { name: 'yearsExperience', title: 'Years Experience', type: 'number' },
        { name: 'currentRole', title: 'Current Role', type: 'string' },
        { name: 'domains', title: 'Domains', type: 'array', of: [{ type: 'string' }] },
        {
          name: 'metrics',
          title: 'Metrics',
          type: 'object',
          fields: [
            { name: 'usersImpacted', title: 'Users Impacted', type: 'string' },
            { name: 'arpuUplift', title: 'ARPU Uplift', type: 'string' },
          ],
        },
        {
          name: 'background',
          title: 'Background',
          type: 'object',
          fields: [
            { name: 'intro', title: 'Introduction', type: 'text' },
            {
              name: 'philosophy',
              title: 'Philosophy',
              type: 'object',
              fields: [
                {
                  name: 'userCentric',
                  title: 'User-Centric',
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string' },
                    { name: 'description', type: 'text' },
                  ],
                },
                {
                  name: 'dataDriven',
                  title: 'Data-Driven',
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string' },
                    { name: 'description', type: 'text' },
                  ],
                },
                {
                  name: 'iterative',
                  title: 'Iterative',
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string' },
                    { name: 'description', type: 'text' },
                  ],
                },
              ],
            },
            {
              name: 'highlights',
              title: 'Highlights',
              type: 'object',
              fields: [
                { name: 'majorLaunches', title: 'Major Launches', type: 'string' },
                { name: 'sideProjects', title: 'Side Projects', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Configuration',
      type: 'object',
      fields: [
        { name: 'title', title: 'Page Title', type: 'string' },
        { name: 'description', title: 'Meta Description', type: 'text' },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
        { name: 'author', title: 'Author', type: 'string' },
        { name: 'ogImage', title: 'OG Image', type: 'string' },
        { name: 'twitterHandle', title: 'Twitter Handle', type: 'string' },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'medium', title: 'Medium', type: 'url' },
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'href', title: 'Link', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'object',
      fields: [
        { name: 'product', title: 'Product Skills', type: 'array', of: [{ type: 'string' }] },
        { name: 'technical', title: 'Technical Skills', type: 'array', of: [{ type: 'string' }] },
        { name: 'design', title: 'Design Skills', type: 'array', of: [{ type: 'string' }] },
        { name: 'leadership', title: 'Leadership Skills', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
  ],
})