import { useState } from "react";
import { cleanImageUrl } from "../../../../shared/utils";

interface TreeImageProps {
	src?: string;
	alt: string;
}

export function TreeImage({ src, alt }: TreeImageProps) {
	const [imageError, setImageError] = useState(false);
	const cleanedSrc = cleanImageUrl(src);

	if (imageError || cleanedSrc === "") {
		return (
			<div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
				<div className="text-6xl">🌳</div>
			</div>
		);
	}

	return (
		<div className="aspect-video overflow-hidden">
			<img
				src={cleanedSrc}
				alt={alt}
				className="w-full h-full object-cover"
				onError={() => setImageError(true)}
			/>
		</div>
	);
}
