import axios, { type InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
	headers: {
		"X-API-VERSION": "1",
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (import.meta.env.DEV) {
			config.baseURL = "/api";
			return config;
		}

		// Production: use proxy
		const url = new URL(config.url || "", "https://youcannevertestenough.tree-nation.com");

		if (config.params) {
			Object.entries(config.params).forEach(([key, value]) => {
				if (value != null) {
					url.searchParams.set(key, String(value));
				}
			});
		}

		config.url = "https://api.allorigins.win/raw";
		config.params = { url: url.toString() };

		return config;
	},
	(error) => Promise.reject(error),
);
