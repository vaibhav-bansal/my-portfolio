/**
 * Sanity CMS Configuration & Data Fetching
 * 
 * @author Vaibhav Bansal
 * @github https://github.com/vaibhav-bansal
 * @website https://vaibhav.bio
 * 
 * This file contains optimized Sanity client configuration,
 * GROQ queries, and fallback data for the portfolio template.
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity configuration with optimized settings
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Use CDN for better performance
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  timeout: 10000, // Increased timeout for better reliability
  perspective: 'published', // Only fetch published content
  stega: {
    enabled: false, // Disable stega for better performance
  },
  // Add token for authenticated requests
  token: import.meta.env.VITE_SANITY_API_TOKEN,
})


// Fallback data in case Sanity is not accessible - using fictional placeholder data
export const fallbackData = {
  personal: {
    _id: 'fallback',
    name: 'Alex Developer',
    heroMessage: 'Building Digital Experiences',
    summary: 'Passionate about creating meaningful digital products that solve real problems.',
    profileImage: null
  },
  focusAreas: [
    {
      _id: 'fallback-1',
      title: 'Product Strategy',
      description: 'Crafting user-centered product strategies that drive business growth.',
      order: 1
    },
    {
      _id: 'fallback-2', 
      title: 'User Experience',
      description: 'Designing intuitive and delightful user experiences.',
      order: 2
    },
    {
      _id: 'fallback-3',
      title: 'Technical Leadership',
      description: 'Leading technical teams to build scalable solutions.',
      order: 3
    }
  ],
  projects: [
    {
      _id: 'fallback-project-1',
      title: 'Portfolio Template',
      subtitle: 'Modern React Portfolio',
      description: 'A high-performance portfolio website built with React, TypeScript, and Sanity CMS.',
      url: 'https://example.com',
      color: '#3B82F6',
      tags: ['React', 'TypeScript', 'Sanity', 'Tailwind'],
      order: 1,
      featured: true,
      image: null
    }
  ],
  socialLinks: [
    {
      _id: 'fallback-social-1',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/example',
      icon: 'linkedin',
      order: 1
    },
    {
      _id: 'fallback-social-2',
      platform: 'GitHub', 
      url: 'https://github.com/example',
      icon: 'github',
      order: 2
    }
  ]
}

// Test connection function
export const testConnection = async () => {
  try {
    const result = await client.fetch('*[_type == "personal"][0]')
    console.log('✅ Sanity connection successful:', result)
    return true
  } catch (error) {
    console.error('❌ Sanity connection failed:', error)
    return false
  }
}


// Image URL builder with optimizations
const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  if (!source) return null
  return builder.image(source).auto('format').quality(80)
}

// Optimized GROQ queries with field selection for better performance
export const queries = {
  // Personal information - only fetch needed fields
  personal: `*[_type == "personal"][0] {
    _id,
    name,
    heroMessage,
    summary,
    "profileImage": profileImage.asset->url,
    "resume": resume.asset->url
  }`,
  
  // Focus areas - optimized query
  focusAreas: `*[_type == "focusArea"] | order(order asc) {
    _id,
    title,
    description,
    order
  }`,
  
  // Projects - optimized with field selection
  projects: `*[_type == "project"] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    url,
    color,
    tags,
    order,
    featured,
    "image": image.asset->url
  }`,
  
  // Featured projects - optimized
  featuredProjects: `*[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    url,
    color,
    tags,
    order,
    "image": image.asset->url
  }`,
  
  // Social links - optimized
  socialLinks: `*[_type == "socialLink" && active == true] | order(order asc) {
    _id,
    platform,
    url,
    icon,
    order
  }`,
  
  // Combined query for initial page load - fetches all data in one request
  allData: `{
    "personal": *[_type == "personal"][0] {
      _id,
      name,
      heroMessage,
      summary,
      "profileImage": profileImage.asset->url,
      "resume": resume.asset->url
    },
    "focusAreas": *[_type == "focusArea"] | order(order asc) {
      _id,
      title,
      description,
      order
    },
    "projects": *[_type == "project"] | order(order asc) {
      _id,
      title,
      subtitle,
      description,
      url,
      color,
      tags,
      order,
      featured,
      "image": image.asset->url
    },
    "socialLinks": *[_type == "socialLink" && active == true] | order(order asc) {
      _id,
      platform,
      url,
      icon,
      order
    }
  }`,
}

export default client
