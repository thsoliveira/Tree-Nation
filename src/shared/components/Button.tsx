import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary" | "ghost" | "warning";
	size?: "sm" | "md" | "lg";
}

const variantClasses = {
	primary: "bg-green-50 text-green-700 hover:bg-green-100",
	secondary: "",
	ghost: "",
	warning: "bg-amber-600 text-white hover:bg-amber-700 rounded-lg",
};

const sizeClasses = {
	sm: "px-3 py-2 text-sm",
	md: "px-4 py-2.5",
	lg: "",
};

export function Button({
	children,
	variant = "primary",
	size = "md",
	className = "",
	...props
}: ButtonProps) {
	return (
		<button
			className={`flex items-center justify-center font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
