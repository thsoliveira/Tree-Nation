import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	const isE2E = process.env.VITE_E2E === "true";

	return {
		plugins: [react()],
		base: mode === "production" ? "/Tree-Nation/" : "/",
		server: {
			port: 3000,
			strictPort: true,
			proxy: isE2E
				? undefined
				: {
						"/api": {
							target: "https://youcannevertestenough.tree-nation.com",
							changeOrigin: true,
							rewrite: (path) => path.replace(/^\/api/, ""),
						},
					},
		},
	};
});
