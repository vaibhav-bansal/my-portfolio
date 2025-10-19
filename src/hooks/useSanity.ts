/**
 * Custom React Query Hooks for Sanity Data Fetching
 * 
 * @author Vaibhav Bansal
 * @github https://github.com/vaibhav-bansal
 * @website https://vaibhav.bio
 * 
 * Optimized data fetching hooks with caching, error handling,
 * and fallback data for the portfolio template.
 */

import { useQuery } from '@tanstack/react-query'
import { client, queries, fallbackData } from '@/lib/sanity'

// Optimized query options for better performance
const defaultQueryOptions = {
  staleTime: 10 * 60 * 1000, // 10 minutes - data is considered fresh for longer
  cacheTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer
  retry: 2, // Retry twice on failure
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: true, // Only refetch when reconnecting to internet
}

// Main hook that fetches all data in one request for better performance
export const useAllData = () => {
  return useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      try {
        console.log('🔍 Attempting to fetch data from Sanity...');
        console.log('API Token present:', !!import.meta.env.VITE_SANITY_API_TOKEN);
        console.log('Environment:', import.meta.env.MODE);
        console.log('Token value (first 10 chars):', import.meta.env.VITE_SANITY_API_TOKEN?.substring(0, 10));
        
        const data = await client.fetch(queries.allData)
        console.log('✅ Sanity data fetched successfully:', data)
        return data
      } catch (error) {
        console.warn('⚠️ Sanity API failed, using fallback data:', error)
        console.log('📋 Using fallback data instead')
        return fallbackData
      }
    },
    ...defaultQueryOptions,
  })
}

// Individual hooks for specific data - these will use cached data if available
export const usePersonal = () => {
  const { data: allData, ...rest } = useAllData()
  
  return {
    data: allData?.personal,
    ...rest,
  }
}

export const useFocusAreas = () => {
  const { data: allData, ...rest } = useAllData()
  
  return {
    data: allData?.focusAreas,
    ...rest,
  }
}

export const useProjects = () => {
  const { data: allData, ...rest } = useAllData()
  
  return {
    data: allData?.projects,
    ...rest,
  }
}

export const useFeaturedProjects = () => {
  const { data: allData, ...rest } = useAllData()
  
  return {
    data: allData?.projects?.filter((project: any) => project.featured),
    ...rest,
  }
}

export const useSocialLinks = () => {
  const { data: allData, ...rest } = useAllData()
  
  return {
    data: allData?.socialLinks,
    ...rest,
  }
}

export const useContactSettings = () => {
  const { data: allData, ...rest } = useAllData()
  
  return {
    data: allData?.contactSettings,
    ...rest,
  }
}

// Fallback hooks for individual queries (used only if needed)
export const usePersonalDirect = () => {
  return useQuery({
    queryKey: ['personal'],
    queryFn: () => client.fetch(queries.personal),
    ...defaultQueryOptions,
  })
}

export const useFocusAreasDirect = () => {
  return useQuery({
    queryKey: ['focusAreas'],
    queryFn: () => client.fetch(queries.focusAreas),
    ...defaultQueryOptions,
  })
}

export const useProjectsDirect = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => client.fetch(queries.projects),
    ...defaultQueryOptions,
  })
}

export const useSocialLinksDirect = () => {
  return useQuery({
    queryKey: ['socialLinks'],
    queryFn: () => client.fetch(queries.socialLinks),
    ...defaultQueryOptions,
  })
}

export const useContactSettingsDirect = () => {
  return useQuery({
    queryKey: ['contactSettings'],
    queryFn: () => client.fetch(queries.contactSettings),
    ...defaultQueryOptions,
  })
}

