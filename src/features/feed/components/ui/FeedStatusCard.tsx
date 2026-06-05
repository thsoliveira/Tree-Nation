import { Heading } from "../../../../shared/components/Heading";
import { Text } from "../../../../shared/components/Text";

interface FeedStatusCardProps {
	icon: string;
	title: string;
	description: string;
}

export function FeedStatusCard({
	icon,
	title,
	description,
}: FeedStatusCardProps) {
	return (
		<div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-sm">
			<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{icon}</div>
			<Heading level="h2" className="mb-2">
				{title}
			</Heading>
			<Text color="secondary">{description}</Text>
		</div>
	);
}
