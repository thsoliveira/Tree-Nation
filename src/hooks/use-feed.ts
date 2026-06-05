import { useInfiniteQuery } from '@tanstack/react-query'
import { getFeed } from '../features/feed/api/get-feed'

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam = 1 }) => getFeed({ page: pageParam }),
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