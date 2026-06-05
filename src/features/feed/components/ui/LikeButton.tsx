import { useState } from "react";

interface LikeButtonProps {
	initialCount: number;
	onLikeChange?: (newCount: number) => void;
}

export function LikeButton({ initialCount, onLikeChange }: LikeButtonProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(initialCount);

	const handleLike = () => {
		const newIsLiked = !isLiked;
		const newCount = newIsLiked ? likeCount + 1 : likeCount - 1;
		setIsLiked(newIsLiked);
		setLikeCount(newCount);
		onLikeChange?.(newCount);
	};

	return (
		<button
			onClick={handleLike}
			aria-label={isLiked ? "Unlike tree" : "Like tree"}
			className={`flex items-center gap-1.5 transition-colors ${
				isLiked ? "text-pink-500" : "text-gray-600 hover:text-pink-500"
			}`}
		>
			<svg
				className="w-5 h-5"
				fill={isLiked ? "currentColor" : "none"}
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/>
			</svg>
			<span className="font-medium">{likeCount}</span>
		</button>
	);
}
