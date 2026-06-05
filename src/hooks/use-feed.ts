import { useInfiniteQuery } from '@tanstack/react-query'
import { getFeed } from '../features/feed/api/get-feed'

interface UseFeedOptions {
  orderByField?: string
  sortDirection?: "ASC" | "DESC"
}

export function useFeed(options?: UseFeedOptions) {
  return useInfiniteQuery({
    queryKey: ['feed', options?.orderByField, options?.sortDirection],
    queryFn: ({ pageParam = 1 }) => getFeed({ page: pageParam, ...options }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.meta.is_last_page) {
        return undefined
      }
      return allPages.length + 1
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30,  
  })
}