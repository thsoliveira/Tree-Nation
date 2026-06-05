import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { server } from "../../../../mocks/server";
import { FeedList } from "../../components/page/FeedsList";
import { vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  useSearch: () => ({
    orderByField: "score",
    sortDirection: "DESC",
  }),
}));

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

const renderWithProviders = (component: React.ReactNode) => {
	const testQueryClient = createTestQueryClient();
	return render(
		<QueryClientProvider client={testQueryClient}>
			{component}
		</QueryClientProvider>,
	);
};

describe("FeedList Integration Tests", () => {
	it("should render loading state initially and then trees on success", async () => {
		renderWithProviders(<FeedList />);
		
		expect(screen.getByText(/Loading trees/i)).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText("Oak Tree")).toBeInTheDocument();
			expect(screen.getByText("Maple Tree")).toBeInTheDocument();
			expect(screen.getByText("Pine Tree")).toBeInTheDocument();
		});
	});

	it("should render error state when API fails", async () => {
		server.use(
			http.get("/api/trees/feed", () => {
				return new HttpResponse(null, { status: 500 });
			}),
		);

		renderWithProviders(<FeedList />);

		await waitFor(() => {
			expect(screen.getByText(/Failed to load feed/i)).toBeInTheDocument();
		});
	});

	it("should render empty state when API returns no trees", async () => {
		server.use(
			http.get("/api/trees/feed", () => {
				return HttpResponse.json({
					data: [],
					meta: { is_last_page: true },
				});
			}),
		);

		renderWithProviders(<FeedList />);

		await waitFor(() => {
			expect(screen.getByText(/No trees yet/i)).toBeInTheDocument();
		});
	});
});
