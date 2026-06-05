import { useState } from "react";
import { cleanImageUrl } from "../utils";

interface ImageProps {
	src?: string;
	alt: string;
	className?: string;
	size?: string;
	loading?: "lazy" | "eager";
	onError?: () => void;
}

export function Image({
	src,
	alt,
	className = "",
	size,
	loading = "lazy",
	onError,
}: ImageProps) {
	const [imageError, setImageError] = useState(false);
	const cleanedSrc = cleanImageUrl({ url: src, size });

	if (imageError || cleanedSrc === "") {
		return null;
	}

	return (
		<img
			src={cleanedSrc}
			alt={alt}
			className={className}
			loading={loading}
			onError={() => {
				setImageError(true);
				onError?.();
			}}
		/>
	);
}
