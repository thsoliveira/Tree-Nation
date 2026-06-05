import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../../../shared/api";
import type { Tree } from "../types";
import { feedKeys } from "../queryKeys";

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

async function getFeed({ page, limit = 10, orderByField = "score", sortDirection = "DESC" }: GetFeedParams): Promise<GetFeedResponse> {
	const { data } = await apiClient.get<GetFeedResponse>("/trees/feed", {
		params: { page, limit, orderByField, sortDirection },
	});
	return data;
}

export interface UseFeedOptions {
	initialPage?: number;
	orderByField?: string;
	sortDirection?: "ASC" | "DESC";
}

export function useFeed(options?: UseFeedOptions) {
	const initialPage = options?.initialPage || 1;
	
	return useInfiniteQuery({
		queryKey: feedKeys.list(options),
		queryFn: ({ pageParam = initialPage }) => getFeed({ page: pageParam, ...options }),
		initialPageParam: initialPage,
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.meta.is_last_page) return undefined;
			return allPages.length + initialPage;
		},
		getPreviousPageParam: (_firstPage, allPages) => {
			const firstPageNumber = initialPage + allPages.length - 1;
			if (firstPageNumber <= initialPage) return undefined;
			return firstPageNumber - 1;
		},
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 30,
	});
}
