import type { UseFeedOptions } from "./queries/feedQueries";

export const feedKeys = {
	all: ["feed"] as const,
	lists: (options: UseFeedOptions = {}) => [...feedKeys.all, options] as const,
	list: (options: UseFeedOptions = {}) => [...feedKeys.lists(options)] as const,
};

export const likesKeys = {
	all: ["likes"] as const,
	details: (treeId: string) => [...likesKeys.all, treeId] as const,
	detail: (treeId: string) => [...likesKeys.details(treeId)] as const,
};

export const commentsKeys = {
	all: ["comments"] as const,
	details: (treeId: string) => [...commentsKeys.all, treeId] as const,
	detail: (treeId: string) => [...commentsKeys.details(treeId)] as const,
};
