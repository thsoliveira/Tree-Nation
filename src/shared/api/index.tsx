import axios from "axios";
import { API_BASE_URL } from "../constants";

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		AllOrigins: "true",
		"X-API-VERSION": "1",
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use((config) => {
	if (!import.meta.env.DEV) {
		// For production: build full target URL with all query parameters
		const targetBaseUrl = "https://youcannevertestenough.tree-nation.com";
		const fullTargetUrl = new URL(config.url || "", targetBaseUrl);

		if (config.params) {
			Object.entries(config.params).forEach(([key, value]) => {
				if (value != null) {
					fullTargetUrl.searchParams.set(key, String(value));
				}
			});
		}

		// Now use allorigins proxy with the encoded full URL
		const url = `https://corsproxy.io/?url=${encodeURIComponent(fullTargetUrl.toString())}`;

		config.url = url;
		config.baseURL = "";
		config.params = {};
	}
	return config;
});
