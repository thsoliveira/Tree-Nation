import { apiClient } from '../../../shared/api'
import type { Like } from '../types'

export interface GetLikeResponse {
  data: Like[]
}
export async function getLikes(treeId: string): Promise<GetLikeResponse> {
  const { data } = await apiClient.get<GetLikeResponse>(`/tree/getLikes/${treeId}`);
  return data;
}
