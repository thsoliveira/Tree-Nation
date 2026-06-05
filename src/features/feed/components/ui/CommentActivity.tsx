import { Avatar } from "../../../../shared/components/Avatar";
import { Text } from "../../../../shared/components/Text";
import { formatDate } from "../../../../shared/utils";
import type { Comment } from "../../types";

interface CommentActivityProps {
	comment: Comment;
}

export function CommentActivity({ comment }: CommentActivityProps) {
	const user = comment.author;
	const fullName =
		user?.full_name ||
		`${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
		"User";

	return (
		<div className="flex gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white border border-gray-100">
			<Avatar src={user?.profile_img || ""} name={fullName} size="md" />
			<div className="flex-1 min-w-0">
				<Text variant="sm">
					<span className="font-semibold">{fullName}</span>
					<span className="text-gray-600"> commented</span>
				</Text>
				{comment.content && (
					<Text variant="sm" className="mt-1">
						{comment.content}
					</Text>
				)}
				<Text variant="xs" color="muted" className="mt-1">
					{formatDate(comment.created_at)}
				</Text>
			</div>
		</div>
	);
}
