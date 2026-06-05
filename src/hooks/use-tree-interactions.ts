import { mergeAndSortActivities } from '../features/feed/utils/activities'
import { useComments } from './use-comments'
import { useLikes } from './use-likes'

export function useTreeInteractions(treeId: string, isExpanded: boolean) {
  const commentsQuery = useComments(treeId, isExpanded)
  const likesQuery = useLikes(treeId, isExpanded)

  const activities = mergeAndSortActivities(commentsQuery.data, likesQuery.data)

  return {
    activities,
    isLoading: commentsQuery.isLoading || likesQuery.isLoading,
    isError: commentsQuery.isError || likesQuery.isError,
  }
}