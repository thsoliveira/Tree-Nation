import { useState } from "react";
import { Image } from "../../../../shared/components/Image";

interface TreeImageProps {
	src?: string;
	alt: string;
}

export function TreeImage({ src, alt }: TreeImageProps) {
	const [imageError, setImageError] = useState(false);

	if (imageError || !src) {
		return (
			<div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
				<div className="text-6xl">🌳</div>
			</div>
		);
	}

	return (
		<div className="aspect-video overflow-hidden">
			<Image
				src={src}
				alt={alt}
				className="w-full h-full object-cover"
				onError={() => setImageError(true)}
			/>
		</div>
	);
}
