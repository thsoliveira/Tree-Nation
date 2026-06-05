import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../shared/api";
import type { Comment } from "../types";
import { commentsKeys } from "../queryKeys";

interface GetCommentsResponse {
	data: Comment[];
}

async function getComments(treeId: string): Promise<GetCommentsResponse> {
	const { data } = await apiClient.get<GetCommentsResponse>(`/tree/getComments/${treeId}`);
	return data;
}

export function useComments(treeId: string, isExpanded: boolean) {
	return useQuery({
		queryKey: commentsKeys.detail(treeId),
		queryFn: () => getComments(treeId),
		enabled: isExpanded,
	});
}
