import { useEffect, useState } from 'react'
import { client, queries } from '@/lib/sanity'

export function useSanityData<T>(query: string, initialData?: T) {
  const [data, setData] = useState<T | null>(initialData || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await client.fetch(query)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query])

  return { data, loading, error, refetch: () => {
    setLoading(true)
    setError(null)
    client.fetch(query).then(setData).catch(setError).finally(() => setLoading(false))
  }}
}

// Specific hooks for different data types
export function useCaseStudies() {
  return useSanityData(queries.caseStudies)
}

export function useMakerProjects() {
  return useSanityData(queries.makerProjects)
}

export function useTestimonials() {
  return useSanityData(queries.testimonials)
}

export function useWriting() {
  return useSanityData(queries.writing)
}

export function useResources() {
  return useSanityData(queries.resources)
}

export function useCaseStudy(id: string) {
  return useSanityData(queries.caseStudy(id))
}

export function useMakerProject(id: string) {
  return useSanityData(queries.makerProject(id))
}