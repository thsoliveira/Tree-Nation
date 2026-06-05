import { apiClient } from "../../../shared/api";
import type { Tree } from "../types";

interface GetFeedParams {
  page: number
  limit?: number
  orderByField?: string
  sortDirection?: "ASC" | "DESC"
}

export interface GetFeedResponse {
  data: Tree[]
  meta: { is_last_page: boolean }
}

export async function getFeed({ page, limit = 10, orderByField = "score", sortDirection = "DESC" }: GetFeedParams): Promise<GetFeedResponse> {
  const { data } = await apiClient.get<GetFeedResponse>("/trees/feed", {
    params: {
      page,
      limit,
      orderByField,
      sortDirection,
    },
  });

  return data;
}