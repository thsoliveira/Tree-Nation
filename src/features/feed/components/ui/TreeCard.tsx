import { useState } from "react";
import { Button } from "../../../../shared/components/Button";
import { Heading } from "../../../../shared/components/Heading";
import { CommentIcon } from "../../../../shared/components/icons/CommentIcon";
import { Text } from "../../../../shared/components/Text";
import { formatDate } from "../../../../shared/utils";
import { useTreeInteractions } from "../../queries/activityQueries";
import type { Tree } from "../../types";
import { ActivityList } from "./ActivityList";
import { LikeButton } from "./LikeButton";
import { TreeImage } from "./TreeImage";

interface TreeCardProps {
	tree: Tree;
}

export function TreeCard({ tree }: TreeCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isLiked, setIsLiked] = useState(tree.is_liked || false);
	const [likeCount, setLikeCount] = useState(tree.likes_count);
	const { activities, isLoading, isError } = useTreeInteractions(
		tree.id.toString(),
		isExpanded,
	);

	const handleLikeClick = () => {
		const newIsLiked = !isLiked;
		setIsLiked(newIsLiked);
		setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);
	};

	return (
		<article className="bg-white my-4 rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
			<TreeImage src={tree.image || ""} alt={tree.species || "Tree"} />

			<div className="p-4 sm:p-6">
				<div className="flex items-start justify-between mb-3 sm:mb-4 flex-wrap gap-3">
					<div className="flex-1 min-w-0">
						<Heading level="h3" className="truncate">
							{tree.species || tree.message || "A New Tree"}
						</Heading>
						<Text color="secondary" className="mt-1">
							{formatDate(tree.birth_date)}
						</Text>
					</div>

					<div className="flex items-center gap-3 sm:ml-4">
						<LikeButton
							count={likeCount}
							isLiked={isLiked}
							onClick={handleLikeClick}
						/>
						<div className="flex items-center gap-1.5 text-gray-600">
							<CommentIcon className="w-5 h-5" />
							<span className="font-medium">{tree.comments_count}</span>
						</div>
					</div>
				</div>

				<Button
					onClick={() => setIsExpanded(!isExpanded)}
					aria-expanded={isExpanded}
					aria-controls={`tree-activity-${tree.id}`}
					className="w-full"
				>
					{isExpanded ? "Hide Activity" : "View Activity"}
				</Button>
			</div>

			{isExpanded && (
				<section
					id={`tree-activity-${tree.id}`}
					className="border-t border-gray-200 bg-gray-50"
				>
					<div className="p-4 sm:p-6">
						<Heading level="h4" className="mb-4">
							Activity
						</Heading>
						<ActivityList
							activities={activities}
							isLoading={isLoading}
							isError={isError}
						/>
					</div>
				</section>
			)}
		</article>
	);
}
