const TARGET_API_BASE_URL = "https://youcannevertestenough.tree-nation.com";
const PROXY_URL = "https://corsproxy.io/?url=";

export const API_BASE_URL = import.meta.env.DEV ? "/api" : "";
export const TARGET_API = TARGET_API_BASE_URL;
export const USE_PROXY = !import.meta.env.DEV;
export const PROXY_BASE = PROXY_URL;
export const THUMBNAIL_BASE_URL = `${TARGET_API_BASE_URL}/thumbs`;
export const DEFAULT_THUMBNAIL_SIZE = "716x0";
