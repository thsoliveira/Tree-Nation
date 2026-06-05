interface HeadingProps {
	children: React.ReactNode;
	className?: string;
	level?: "h1" | "h2" | "h3" | "h4";
}

const levelClasses = {
	h1: "text-2xl sm:text-3xl font-bold",
	h2: "text-xl sm:text-2xl font-semibold",
	h3: "text-lg sm:text-xl font-semibold",
	h4: "text-sm font-semibold uppercase tracking-wide",
};

export function Heading({
	children,
	className = "",
	level = "h2",
}: HeadingProps) {
	const Tag = level;
	return (
		<Tag className={`${levelClasses[level]} ${className}`}>{children}</Tag>
	);
}
