import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'comingSoon',
      title: 'Coming Soon',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'impact',
      title: 'Impact Metrics',
      type: 'object',
      fields: [
        { name: 'activationTime', title: 'Activation Time', type: 'string' },
        { name: 'leads', title: 'Leads', type: 'string' },
        { name: 'conversionRate', title: 'Conversion Rate', type: 'string' },
        { name: 'usersUpgraded', title: 'Users Upgraded', type: 'string' },
        { name: 'couponTypes', title: 'Coupon Types', type: 'string' },
        { name: 'campaignFlexibility', title: 'Campaign Flexibility', type: 'string' },
        { name: 'partners', title: 'Partners', type: 'string' },
        { name: 'customersReferred', title: 'Customers Referred', type: 'string' },
        { name: 'partnerTiers', title: 'Partner Tiers', type: 'string' },
        { name: 'workflowsAutomated', title: 'Workflows Automated', type: 'string' },
        { name: 'timeSaved', title: 'Time Saved', type: 'string' },
        { name: 'adoption', title: 'Adoption', type: 'string' },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        { name: 'context', title: 'Context', type: 'text' },
        { name: 'problem', title: 'Problem', type: 'text' },
        {
          name: 'process',
          title: 'Process',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Phase Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
        { name: 'artifacts', title: 'Artifacts', type: 'array', of: [{ type: 'string' }] },
        { name: 'impactDetails', title: 'Impact Details', type: 'text' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
  },
})