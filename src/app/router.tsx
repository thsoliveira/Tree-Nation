import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import Feed from "../routes/feed";

const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Feed,
});

export const routeTree = rootRoute.addChildren([indexRoute]);
