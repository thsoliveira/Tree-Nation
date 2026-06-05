import { apiClient } from '../../../shared/api'
import { type Comment, CommentSchema } from '../types'

export async function getComments(treeId: string): Promise<Comment[]> {
  const response = await apiClient.get(`/tree/getComments/${treeId}`)
  return CommentSchema.array().parse(response.data.data)
}