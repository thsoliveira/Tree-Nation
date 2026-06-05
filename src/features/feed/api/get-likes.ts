import { apiClient } from '../../../shared/api'
import { type Like, LikeSchema } from '../types'

export async function getLikes(treeId: string): Promise<Like[]> {
  const response = await apiClient.get(`/tree/getLikes/${treeId}`)
  return LikeSchema.array().parse(response.data.data)
}