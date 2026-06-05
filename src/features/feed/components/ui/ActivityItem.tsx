import type { Activity } from "../../types";
import { CommentActivity } from "./CommentActivity";
import { LikeActivity } from "./LikeActivity";

interface ActivityItemProps {
	activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
	if (activity.type === "comment") {
		return <CommentActivity comment={activity} />;
	}
	
	return <LikeActivity like={activity} />;
}
