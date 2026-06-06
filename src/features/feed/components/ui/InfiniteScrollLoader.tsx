import { useEffect, useRef } from "react";

interface InfiniteScrollLoaderProps {
	isLoading: boolean;
	hasMore: boolean;
	onLoadMore: () => void;
}

export function InfiniteScrollLoader({
	isLoading,
	hasMore,
	onLoadMore,
}: InfiniteScrollLoaderProps) {
	const elementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const element = elementRef.current;

		if (!element || isLoading || !hasMore) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					onLoadMore();
				}
			},
			{ rootMargin: "200px" },
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [isLoading, hasMore, onLoadMore]);

	return <div ref={elementRef} className="h-1" />;
}