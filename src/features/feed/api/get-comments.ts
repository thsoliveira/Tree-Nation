import { apiClient } from '../../../shared/api'
import type { Comment } from '../types'

export interface GetCommentResponse {
  data: Comment[]
}
export async function getComments(treeId: string): Promise<GetCommentResponse> {
  const { data } = await apiClient.get<GetCommentResponse>(`/tree/getComments/${treeId}`);
  return data;
}