import type { Activity } from "../../types";
import { ActivityItem } from "./ActivityItem";

interface ActivityListProps {
	activities: Activity[];
	isLoading: boolean;
	isError: boolean;
}

export function ActivityList({
	activities = [],
	isLoading,
	isError,
}: ActivityListProps) {
	if (isLoading) {
		return (
			<div className="text-center py-6">
				<div className="inline-block animate-spin rounded-full h-6 w-6 border-3 border-green-500 border-t-transparent"></div>
				<p className="text-gray-500 mt-2 text-sm">Loading activity...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center py-6">
				<p className="text-red-500 text-sm">Failed to load activity</p>
			</div>
		);
	}

	if (activities.length === 0) {
		return (
			<div className="text-center py-6">
				<p className="text-gray-500 text-sm">No activity yet</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{activities.map((activity) => (
				<ActivityItem key={activity?.id} activity={activity} />
			))}
		</div>
	);
}
