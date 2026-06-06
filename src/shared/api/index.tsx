import axios from "axios";
import {
	API_BASE_URL,
	TARGET_API,
	USE_PROXY,
	PROXY_BASE,
} from "../constants";

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		AllOrigins: "true",
		"X-API-VERSION": "1",
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use((config) => {
	if (USE_PROXY) {
		// Build full target URL with all query parameters
		const fullTargetUrl = new URL(config.url || "", TARGET_API);

		if (config.params) {
			Object.entries(config.params).forEach(([key, value]) => {
				if (value != null) {
					fullTargetUrl.searchParams.set(key, String(value));
				}
			});
		}

		// Use proxy with the encoded full URL
		config.url = `${PROXY_BASE}${encodeURIComponent(fullTargetUrl.toString())}`;
		config.baseURL = "";
		config.params = {};
	}
	return config;
});
