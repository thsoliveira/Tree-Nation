import { HttpResponse, http } from "msw";
import type { Tree } from "../features/feed/types";

const mockTrees: Tree[] = [
	{
		id: 1,
		quantity: 1,
		type: "tree",
		drops_count: 5,
		likes_count: 10,
		is_pinned: false,
		comments_count: 2,
		hash_token: "abc123",
		is_collected: false,
		hide_gift_wrapper: false,
		created_at: "2024-01-01T00:00:00Z",
		score: 100,
		replanters_num: 2,
		replanters_distinct_num: 2,
		num_replants: 2,
		replant_header: [],
		birth_date: "2024-01-01",
		is_anonymous: false,
		can_be_replanted: true,
		owner: { full_name: "Owner" },
		planter: { full_name: "Planter" },
		species: "Oak Tree",
		image: "https://example.com/oak.jpg",
	},
	{
		id: 2,
		quantity: 1,
		type: "tree",
		drops_count: 3,
		likes_count: 5,
		is_pinned: false,
		comments_count: 1,
		hash_token: "def456",
		is_collected: false,
		hide_gift_wrapper: false,
		created_at: "2024-01-02T00:00:00Z",
		score: 90,
		replanters_num: 1,
		replanters_distinct_num: 1,
		num_replants: 1,
		replant_header: [],
		birth_date: "2024-01-02",
		is_anonymous: false,
		can_be_replanted: true,
		owner: { full_name: "Owner 2" },
		planter: { full_name: "Planter 2" },
		species: "Maple Tree",
		image: "https://example.com/maple.jpg",
	},
	{
		id: 3,
		quantity: 1,
		type: "tree",
		drops_count: 8,
		likes_count: 15,
		is_pinned: false,
		comments_count: 4,
		hash_token: "ghi789",
		is_collected: false,
		hide_gift_wrapper: false,
		created_at: "2024-01-03T00:00:00Z",
		score: 95,
		replanters_num: 3,
		replanters_distinct_num: 3,
		num_replants: 3,
		replant_header: [],
		birth_date: "2024-01-03",
		is_anonymous: false,
		can_be_replanted: true,
		owner: { full_name: "Owner 3" },
		planter: { full_name: "Planter 3" },
		species: "Pine Tree",
		image: "https://example.com/pine.jpg",
	},
];

export const handlers = [
	http.get("/api/trees/feed", () => {
		return HttpResponse.json({
			data: mockTrees,
			meta: { is_last_page: true },
		});
	}),
	http.get("/api/tree/getLikes/:treeId", () => {
		return HttpResponse.json({
			data: [
				{
					id: 1,
					created_at: "2024-01-15T10:00:00Z",
					author: { full_name: "Jane Smith" },
				},
			],
		});
	}),
	http.get("/api/tree/getComments/:treeId", () => {
		return HttpResponse.json({
			data: [
				{
					id: 1,
					content: "Great tree!",
					created_at: "2024-01-16T11:00:00Z",
					author: { full_name: "John Doe" },
				},
			],
		});
	}),
];
