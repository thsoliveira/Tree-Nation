import { apiClient } from "../../../shared/api";
import { FeedResponseSchema, type FeedResponse } from "../types";

export async function getFeed({ page, limit = 10 }: { page: number; limit?: number }): Promise<FeedResponse> {
  const response = await apiClient.get('/trees/feed', {
    params: {
      page,
      limit,
      orderByField: 'score',
      sortDirection: 'DESC',
    },
  })
  return FeedResponseSchema.parse(response.data)
}