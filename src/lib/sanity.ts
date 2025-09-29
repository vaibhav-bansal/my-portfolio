import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Query helpers
export const queries = {
  // Get all portfolio data
  portfolio: `*[_type == "portfolio"][0]{
    personal,
    seo,
    social,
    navigation,
    skills,
    caseStudies[]{
      _id,
      title,
      subtitle,
      description,
      image,
      imageAlt,
      tags,
      duration,
      team,
      role,
      comingSoon,
      impact,
      content
    },
    makerProjects[]{
      _id,
      title,
      subtitle,
      description,
      image,
      tags,
      github,
      website,
      comingSoon,
      stats
    },
    testimonials[]{
      _id,
      name,
      role,
      company,
      image,
      rating,
      text,
      project
    },
    writing[]{
      _id,
      title,
      subtitle,
      description,
      url,
      platform,
      publishDate,
      readTime,
      tags,
      comingSoon
    },
    resources[]{
      _id,
      title,
      description,
      downloadUrl,
      type,
      size,
      comingSoon
    }
  }`,
  
  // Get case studies only
  caseStudies: `*[_type == "caseStudy"] | order(_createdAt desc){
    _id,
    title,
    subtitle,
    description,
    image,
    imageAlt,
    tags,
    duration,
    team,
    role,
    comingSoon,
    impact,
    content
  }`,
  
  // Get single case study by ID
  caseStudy: (id: string) => `*[_type == "caseStudy" && _id == "${id}"][0]{
    _id,
    title,
    subtitle,
    description,
    image,
    imageAlt,
    tags,
    duration,
    team,
    role,
    comingSoon,
    impact,
    content
  }`,
  
  // Get maker projects only
  makerProjects: `*[_type == "makerProject"] | order(_createdAt desc){
    _id,
    title,
    subtitle,
    description,
    image,
    tags,
    github,
    website,
    comingSoon,
    stats
  }`,
  
  // Get single maker project by ID
  makerProject: (id: string) => `*[_type == "makerProject" && _id == "${id}"][0]{
    _id,
    title,
    subtitle,
    description,
    image,
    tags,
    github,
    website,
    comingSoon,
    stats
  }`,
  
  // Get testimonials
  testimonials: `*[_type == "testimonial"] | order(_createdAt desc){
    _id,
    name,
    role,
    company,
    image,
    rating,
    text,
    project
  }`,
  
  // Get writing/articles
  writing: `*[_type == "article"] | order(publishDate desc){
    _id,
    title,
    subtitle,
    description,
    url,
    platform,
    publishDate,
    readTime,
    tags,
    comingSoon
  }`,
  
  // Get resources
  resources: `*[_type == "resource"] | order(_createdAt desc){
    _id,
    title,
    description,
    downloadUrl,
    type,
    size,
    comingSoon
  }`
}