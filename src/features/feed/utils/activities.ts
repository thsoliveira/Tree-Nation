import type { Activity, Comment, Like } from "../types";

export function transformCommentsToActivities(comments: Comment[]): Activity[] {
	return comments.map((comment) => ({ ...comment, type: "comment" }));
}

export function transformLikesToActivities(likes: Like[]): Activity[] {
	return likes.map((like) => ({ ...like, type: "like" }));
}

export function sortActivities(activities: Activity[]): Activity[] {
	return [...activities].sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
	);
}

export function mergeAndSortActivities(
	comments: Comment[] = [],
	likes: Like[] = [],
): Activity[] {
	const commentActivities = transformCommentsToActivities(comments);
	const likeActivities = transformLikesToActivities(likes);
	return sortActivities([...commentActivities, ...likeActivities]);
}
