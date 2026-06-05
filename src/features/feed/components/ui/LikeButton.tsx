import { HeartIcon } from "../../../../shared/components/icons/HeartIcon";

interface LikeButtonProps {
	count: number;
	isLiked: boolean;
	onClick: () => void;
}

export function LikeButton({ count, isLiked, onClick }: LikeButtonProps) {
	return (
		<button
			onClick={onClick}
			aria-label={isLiked ? "Unlike tree" : "Like tree"}
			className={`flex items-center gap-1.5 transition-colors ${
				isLiked ? "text-pink-500" : "text-gray-600 hover:text-pink-500"
			}`}
		>
			<HeartIcon className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
			<span className="font-medium">{count}</span>
		</button>
	);
}
