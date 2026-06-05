import { mergeAndSortActivities } from "../utils/activities";
import { useComments } from "./commentsQueries";
import { useLikes } from "./likesQueries";

export function useTreeInteractions(treeId: string, isExpanded: boolean) {
	const {
		data: commentsResponse,
		isLoading: commentsLoading,
		isError: commentsIsError,
	} = useComments(treeId, isExpanded);
	const {
		data: likesResponse,
		isLoading: likesLoading,
		isError: likesIsError,
	} = useLikes(treeId, isExpanded);

	const activities = mergeAndSortActivities(
		commentsResponse?.data,
		likesResponse?.data,
	);

	return {
		activities,
		isLoading: commentsLoading || likesLoading,
		isError: commentsIsError || likesIsError,
	};
}
