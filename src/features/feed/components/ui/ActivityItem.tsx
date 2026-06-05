import type { Activity } from "../../types";
import { CommentActivity } from "./CommentActivity";
import { LikeActivity } from "./LikeActivity";

interface ActivityItemProps {
	activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
	return (
		<li>
			{activity.type === "comment" ? (
				<CommentActivity comment={activity} />
			) : (
				<LikeActivity like={activity} />
			)}
		</li>
	);
}
