interface TextProps {
	children: React.ReactNode;
	className?: string;
	variant?: "xs" | "sm" | "base" | "lg";
	color?: "default" | "muted" | "secondary" | "primary";
}

const variantClasses = {
	xs: "text-xs",
	sm: "text-sm",
	base: "text-base",
	lg: "text-lg",
};

const colorClasses = {
	default: "text-gray-900",
	muted: "text-gray-400",
	secondary: "text-gray-500",
	primary: "text-green-700",
};

export function Text({
	children,
	className = "",
	variant = "base",
	color = "default",
}: TextProps) {
	return (
		<p
			className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`}
		>
			{children}
		</p>
	);
}
