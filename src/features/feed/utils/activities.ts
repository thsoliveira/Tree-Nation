import type { Activity, Comment, Like } from "../types";

interface ActivityTransformer<T> {
	transform(item: T): Activity;
}

class CommentTransformer implements ActivityTransformer<Comment> {
	transform(comment: Comment): Activity {
		return { ...comment, type: "comment" };
	}
}

class LikeTransformer implements ActivityTransformer<Like> {
	transform(like: Like): Activity {
		return { ...like, type: "like" };
	}
}

interface ActivitySorter {
	sort(activities: Activity[]): Activity[];
}

class DateDescendingSorter implements ActivitySorter {
	sort(activities: Activity[]): Activity[] {
		return [...activities].sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
		);
	}
}

export function transformCommentsToActivities(comments: Comment[]): Activity[] {
	const transformer = new CommentTransformer();
	return comments.map(transformer.transform);
}

export function transformLikesToActivities(likes: Like[]): Activity[] {
	const transformer = new LikeTransformer();
	return likes.map(transformer.transform);
}

export function sortActivities(activities: Activity[]): Activity[] {
	const sorter = new DateDescendingSorter();
	return sorter.sort(activities);
}

export function mergeAndSortActivities(
	comments: Comment[] = [],
	likes: Like[] = [],
): Activity[] {
	const commentActivities = transformCommentsToActivities(comments);
	const likeActivities = transformLikesToActivities(likes);
	return sortActivities([...commentActivities, ...likeActivities]);
}
