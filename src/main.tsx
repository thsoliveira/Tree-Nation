import { createRouter, RouterProvider, createHashHistory } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./app/providers.tsx";
import { routeTree } from "./app/router";
import "./index.css";

const history = createHashHistory();
const router = createRouter({ routeTree, history });

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
