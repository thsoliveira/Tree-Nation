import { apiClient } from "../../../shared/api";
import { FeedResponseSchema, type FeedResponse } from "../types";

interface GetFeedParams {
  page: number
  limit?: number
  orderByField?: string
  sortDirection?: "ASC" | "DESC"
}

export async function getFeed({ page, limit = 10, orderByField = "score", sortDirection = "DESC" }: GetFeedParams): Promise<FeedResponse> {
  const response = await apiClient.get("/trees/feed", {
    params: {
      page,
      limit,
      orderByField,
      sortDirection,
    },
  });

  return FeedResponseSchema.parse(response.data);
}