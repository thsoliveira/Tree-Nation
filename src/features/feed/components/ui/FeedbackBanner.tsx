import { Text } from "../../../../shared/components/Text";

interface FeedbackBannerProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function FeedbackBanner({
	title,
	description,
	children,
}: FeedbackBannerProps) {
	return (
		<div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
			<Text variant="sm" className="font-medium text-amber-900">
				{title}
			</Text>
			{description && (
				<Text variant="sm" className="mt-1 text-amber-700">
					{description}
				</Text>
			)}
			<div className="mt-3">{children}</div>
		</div>
	);
}
