import { useQuery } from '@tanstack/react-query'
import { getLikes } from '../features/feed/api/get-likes'
export function useLikes(treeId: string, isExpanded: boolean) {
  return useQuery({
    queryKey: ['likes', treeId],
    queryFn: () => getLikes(treeId),
    enabled: isExpanded,
  })
}