import { Temporal } from "@js-temporal/polyfill";
import { DEFAULT_THUMBNAIL_SIZE, THUMBNAIL_BASE_URL } from "../constants";

export function formatDate(dateString: string): string {
	return Temporal.Instant.from(dateString)
		.toZonedDateTimeISO(Temporal.Now.timeZoneId())
		.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
}

interface CleanImageUrlOptions {
	url?: string;
	size?: string;
}

export function cleanImageUrl({
	url,
	size = DEFAULT_THUMBNAIL_SIZE,
}: CleanImageUrlOptions): string {
	if (!url) {
		return "";
	}

	const cleaned = url.replace(/^[\s`'"]+|[\s`'"]+$/g, "");

	if (!cleaned) {
		return "";
	}

	if (cleaned.startsWith(THUMBNAIL_BASE_URL)) {
		return cleaned;
	}

	return `${THUMBNAIL_BASE_URL}/${size}/${cleaned}`;
}
