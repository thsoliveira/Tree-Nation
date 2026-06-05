import { Avatar } from "../../../../shared/components/Avatar";
import { formatDate } from "../../../../shared/utils";
import type { Like } from "../../types";

interface LikeActivityProps {
	like: Like;
}

export function LikeActivity({ like }: LikeActivityProps) {
	const user = like.author;
	const fullName =
		user?.full_name ||
		`${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
		"User";

	return (
		<div className="flex gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white border border-gray-100">
			<Avatar src={user?.profile_img || ""} name={fullName} size="md" />
			<div className="flex-1 min-w-0">
				<p className="text-sm text-gray-900">
					<span className="font-semibold">{fullName}</span>
					<span className="text-gray-600"> liked</span>
				</p>
				<p className="text-xs text-gray-400 mt-1">
					{formatDate(like.created_at)}
				</p>
			</div>
		</div>
	);
}
