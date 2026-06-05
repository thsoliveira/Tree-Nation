import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import Feed from "../routes/feed";

const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Feed,
	validateSearch: (search: Record<string, unknown>) => ({
		page: (search.page as number) || 1,
		orderByField: (search.orderByField as string) || "score",
		sortDirection: (search.sortDirection as "ASC" | "DESC") || "DESC",
	}),
});

export const routeTree = rootRoute.addChildren([indexRoute]);
