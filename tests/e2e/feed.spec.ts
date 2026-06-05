import { expect, test } from "@playwright/test";

const mockTrees = [
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
];

const mockLikes = [
	{
		id: 1,
		created_at: "2024-01-15T10:00:00Z",
		author: { full_name: "Jane Smith" },
	},
];

const mockComments = [
	{
		id: 1,
		content: "Great tree!",
		created_at: "2024-01-16T11:00:00Z",
		author: { full_name: "John Doe" },
	},
];

test.describe("Tree Feed", () => {
	test.beforeEach(async ({ page }) => {
		// Mock feed API using regex to ensure it's caught
		await page.route(/trees\/feed/, async (route) => {
			await route.fulfill({
				json: {
					data: mockTrees,
					meta: { is_last_page: true },
				},
			});
		});

		await page.route(/tree\/getLikes/, async (route) => {
			await route.fulfill({
				json: { data: mockLikes },
			});
		});

		await page.route(/tree\/getComments/, async (route) => {
			await route.fulfill({
				json: { data: mockComments },
			});
		});
	});

	test("should load the feed page and display title", async ({ page }) => {
		await page.goto("/");

		await expect(page).toHaveTitle(/tree-nation/);
		await expect(
			page.getByRole("heading", { name: "Tree Feed" }),
		).toBeVisible();
		await expect(
			page.getByText("Discover trees planted around the world"),
		).toBeVisible();
	});

	test('should load and display tree cards with "View Activity" buttons', async ({
		page,
	}) => {
		await page.goto("/");

		const firstViewActivityButton = page
			.getByRole("button", { name: "View Activity" })
			.first();
		await expect(firstViewActivityButton).toBeVisible();

		await expect(page.getByText("Oak Tree")).toBeVisible();
		await expect(page.getByText("Maple Tree")).toBeVisible();
	});

	test('should expand and show activity section when "View Activity" is clicked', async ({
		page,
	}) => {
		await page.goto("/");

		const firstViewActivityButton = page
			.getByRole("button", { name: "View Activity" })
			.first();
		await expect(firstViewActivityButton).toBeVisible();

		await firstViewActivityButton.click();

		await expect(
			page.getByRole("button", { name: "Hide Activity" }).first(),
		).toBeVisible();
		await expect(page.getByRole("heading", { name: "Activity" })).toBeVisible();
		await expect(page.getByText("John Doe")).toBeVisible();
		await expect(page.getByText("Great tree!")).toBeVisible();
		await expect(page.getByText("Jane Smith")).toBeVisible();
	});

	test("should toggle like button and update count", async ({ page }) => {
		await page.goto("/");

		await expect(
			page.getByRole("button", { name: "View Activity" }).first(),
		).toBeVisible();

		const firstTreeCard = page.locator(".bg-white.rounded-xl").first();
		const likeButton = firstTreeCard.getByRole("button").first();
		const countSpan = likeButton.locator("span");

		const initialCount = await countSpan.textContent();
		await expect(initialCount).toBe("10");

		await likeButton.click();
		await expect(countSpan).toHaveText("11");

		await likeButton.click();
		await expect(countSpan).toHaveText("10");
	});
});
