import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../../../shared/api";
import { feedKeys } from "../queryKeys";
import type { Tree } from "../types";

interface GetFeedParams {
	page: number;
	limit?: number;
	orderByField?: string;
	sortDirection?: "ASC" | "DESC";
}

interface GetFeedResponse {
	data: Tree[];
	meta: { is_last_page: boolean };
}

async function getFeed({
	page,
	limit = 10,
	orderByField = "score",
	sortDirection = "DESC",
}: GetFeedParams): Promise<GetFeedResponse> {
	const { data } = await apiClient.get<GetFeedResponse>("/trees/feed", {
		params: { page, limit, orderByField, sortDirection },
	});
	return data;
}

export interface UseFeedOptions {
	orderByField?: string;
	sortDirection?: "ASC" | "DESC";
}

export function useFeed(options?: UseFeedOptions) {
	return useInfiniteQuery({
		queryKey: feedKeys.list(options),
		queryFn: ({ pageParam = 1 }) => getFeed({ page: pageParam, ...options }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.meta.is_last_page) return undefined;
			return allPages.length + 1;
		},
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 30,
	});
}
