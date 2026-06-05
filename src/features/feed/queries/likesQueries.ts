import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../shared/api";
import { likesKeys } from "../queryKeys";
import type { Like } from "../types";

interface GetLikesResponse {
	data: Like[];
}

async function getLikes(treeId: string): Promise<GetLikesResponse> {
	const { data } = await apiClient.get<GetLikesResponse>(
		`/tree/getLikes/${treeId}`,
	);
	return data;
}

export function useLikes(treeId: string, isExpanded: boolean) {
	return useQuery({
		queryKey: likesKeys.detail(treeId),
		queryFn: () => getLikes(treeId),
		enabled: isExpanded,
	});
}
