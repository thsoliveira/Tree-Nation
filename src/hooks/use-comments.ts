import { useQuery } from '@tanstack/react-query'
import { getComments } from '../features/feed/api/get-comments'

export function useComments(treeId: string, isExpanded: boolean) {
  return useQuery({
    queryKey: ['comments', treeId],
    queryFn: () => getComments(treeId),
    enabled: isExpanded,
  })
}