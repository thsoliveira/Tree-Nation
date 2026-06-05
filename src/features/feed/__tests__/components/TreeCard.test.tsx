import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TreeCard } from "../../components/ui/TreeCard";
import type { Tree } from "../../types";

const mockTree: Tree = {
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
	image: "https://example.com/tree.jpg",
};

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

const renderWithQueryClient = (component: React.ReactNode) => {
	const testQueryClient = createTestQueryClient();
	return render(
		<QueryClientProvider client={testQueryClient}>
			{component}
		</QueryClientProvider>,
	);
};

describe("TreeCard", () => {
	it("should render tree card with basic information", () => {
		renderWithQueryClient(<TreeCard tree={mockTree} />);

		expect(screen.getByText("Oak Tree")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
	});

	it("should expand and show activity section when button is clicked", async () => {
		renderWithQueryClient(<TreeCard tree={mockTree} />);

		const expandButton = screen.getByRole("button", { name: /View Activity/i });
		expect(expandButton).toBeInTheDocument();
		expect(expandButton).toHaveAttribute("aria-expanded", "false");

		expect(screen.queryByText("Activity")).not.toBeInTheDocument();

		fireEvent.click(expandButton);

		expect(expandButton).toHaveAttribute("aria-expanded", "true");
		await waitFor(() => {
			expect(screen.getByText("Activity")).toBeInTheDocument();
		});
	});

	it("should toggle like count when like button is clicked", () => {
		renderWithQueryClient(<TreeCard tree={mockTree} />);

		const likeButton = screen.getByRole("button", { name: /Like tree/i });
		expect(likeButton).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();

		fireEvent.click(likeButton);
		expect(screen.getByText("11")).toBeInTheDocument();
		expect(likeButton).toHaveAttribute("aria-label", "Unlike tree");

		fireEvent.click(likeButton);
		expect(screen.getByText("10")).toBeInTheDocument();
		expect(likeButton).toHaveAttribute("aria-label", "Like tree");
	});

	it("should display fallback text when species and message are not available", () => {
		const treeWithoutName = {
			...mockTree,
			species: undefined,
			message: undefined,
		};
		renderWithQueryClient(<TreeCard tree={treeWithoutName} />);

		expect(screen.getByText("A New Tree")).toBeInTheDocument();
	});
});
