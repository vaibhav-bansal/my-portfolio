import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'webhookUrl',
      title: 'Contact Form Webhook URL',
      type: 'url',
      description: 'URL where contact form submissions will be sent'
    }),
    defineField({
      name: 'contactMessage',
      title: 'Contact Page Message',
      type: 'text',
      rows: 3,
      description: 'Message shown on the contact page'
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'email',
      description: 'Your contact email address'
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Your phone number (optional)'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Your location (city, country)'
    })
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'location'
    }
  }
})
