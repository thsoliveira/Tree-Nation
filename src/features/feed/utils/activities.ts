import type { Activity, Comment, Like } from '../types'

function transformCommentToActivity(comment: Comment): Activity {
  return { ...comment, type: 'comment' }
}

function transformLikeToActivity(like: Like): Activity {
  return { ...like, type: 'like' }
}

export function mergeAndSortActivities(
  comments: Comment[] = [],
  likes: Like[] = []
): Activity[] {
  const commentActivities = comments.map(transformCommentToActivity)
  const likeActivities = likes.map(transformLikeToActivity)

  return [...commentActivities, ...likeActivities].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}