import { apiClient } from "../../../shared/api";
import { FeedResponseSchema, type FeedResponse } from "../types";

interface GetFeedParams {
  page: number
  limit?: number
}

export async function getFeed({ page, limit = 10 }: GetFeedParams): Promise<FeedResponse> {
  const response = await apiClient.get("/trees/feed", {
    params: {
      page,
      limit,
      orderByField: "score",
      sortDirection: "DESC",
    },
  });

  return FeedResponseSchema.parse(response.data);
}