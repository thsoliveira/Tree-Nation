import type { Comment, Like, Activity } from "../../types";
import {
	mergeAndSortActivities,
	transformCommentsToActivities,
	transformLikesToActivities,
	sortActivities,
} from "../../utils/activities";

describe("activities utils", () => {
	const comment1: Comment = {
		id: 1,
		content: "Great tree!",
		created_at: "2024-01-15T10:00:00Z",
		author: { full_name: "John Doe" },
	};

	const like1: Like = {
		id: 2,
		created_at: "2024-01-14T09:00:00Z",
		author: { full_name: "Jane Smith" },
	};

	const comment2: Comment = {
		id: 3,
		content: "Love it!",
		created_at: "2024-01-16T08:00:00Z",
		author: { full_name: "Bob Wilson" },
	};

	const like2: Like = {
		id: 4,
		created_at: "2024-01-16T12:00:00Z",
		author: { full_name: "Alice Brown" },
	};

	describe("transformCommentsToActivities", () => {
		it("should transform comments to activities with type 'comment'", () => {
			const result = transformCommentsToActivities([comment1, comment2]);
			expect(result).toHaveLength(2);
			expect(result[0]).toEqual({ ...comment1, type: "comment" });
			expect(result[1]).toEqual({ ...comment2, type: "comment" });
		});

		it("should return empty array when comments is empty", () => {
			const result = transformCommentsToActivities([]);
			expect(result).toEqual([]);
		});
	});

	describe("transformLikesToActivities", () => {
		it("should transform likes to activities with type 'like'", () => {
			const result = transformLikesToActivities([like1, like2]);
			expect(result).toHaveLength(2);
			expect(result[0]).toEqual({ ...like1, type: "like" });
			expect(result[1]).toEqual({ ...like2, type: "like" });
		});

		it("should return empty array when likes is empty", () => {
			const result = transformLikesToActivities([]);
			expect(result).toEqual([]);
		});
	});

	describe("sortActivities", () => {
		it("should sort activities by created_at in descending order", () => {
			const activities: Activity[] = [
				{ ...comment1, type: "comment" },
				{ ...like2, type: "like" },
			];
			const result = sortActivities(activities);
			expect(result[0].id).toBe(4);
			expect(result[1].id).toBe(1);
		});
	});

	describe("mergeAndSortActivities", () => {
		it("should merge comments and likes and sort by created_at descending", () => {
			const result = mergeAndSortActivities([comment1, comment2], [like1, like2]);

			expect(result).toHaveLength(4);
			expect(result[0].id).toBe(4);
			expect(result[0].type).toBe("like");
			expect(result[1].id).toBe(3);
			expect(result[1].type).toBe("comment");
			expect(result[2].id).toBe(1);
			expect(result[2].type).toBe("comment");
			expect(result[3].id).toBe(2);
			expect(result[3].type).toBe("like");
		});

		it("should return empty array when both comments and likes are empty", () => {
			const result = mergeAndSortActivities([], []);
			expect(result).toEqual([]);
		});

		it("should return only comments when likes are empty", () => {
			const result = mergeAndSortActivities([comment1, comment2], []);
			expect(result).toHaveLength(2);
			expect(result[0].id).toBe(3);
			expect(result[1].id).toBe(1);
		});

		it("should return only likes when comments are empty", () => {
			const result = mergeAndSortActivities([], [like1, like2]);
			expect(result).toHaveLength(2);
			expect(result[0].id).toBe(4);
			expect(result[1].id).toBe(2);
		});

		it("should handle undefined values gracefully", () => {
			const result = mergeAndSortActivities(undefined, undefined);
			expect(result).toEqual([]);
		});
	});
});
