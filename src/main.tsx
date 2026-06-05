import "@js-temporal/polyfill";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./app/providers.tsx";
import { routeTree } from "./app/router";
import "./index.css";

const router = createRouter({
	routeTree,
	basepath: import.meta.env.DEV ? "/" : "/Tree-Nation/",
});

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<Providers>
			<RouterProvider router={router} />
		</Providers>
	</StrictMode>,
);
