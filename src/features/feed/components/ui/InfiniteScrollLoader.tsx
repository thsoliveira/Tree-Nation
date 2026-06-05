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
	const observerRef = useRef<IntersectionObserver | null>(null);
	const elementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (isLoading || !hasMore) {
			return;
		}

		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry?.isIntersecting) {
					onLoadMore();
				}
			},
			{ rootMargin: "200px" }
		);

		if (elementRef.current) {
			observerRef.current.observe(elementRef.current);
		}

		return () => {
			observerRef.current?.disconnect();
		};
	}, [isLoading, hasMore, onLoadMore]);

	return <div ref={elementRef} className="h-1" />;
}
