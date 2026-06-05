import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearch } from "@tanstack/react-router";
import { TreeCard } from "../ui/TreeCard";
import { FeedActionBanner } from "../ui/FeedActionBanner";
import { FeedLoadingState } from "../ui/FeedLoadingState";
import { FeedStatusCard } from "../ui/FeedStatusCard";
import { useFeed } from "../../queries/feedQueries";

function LoadMoreSentinel({ onLoadMore }: { onLoadMore: () => void }) {
	useEffect(() => {
		onLoadMore();
	}, [onLoadMore]);
	return null;
}

export function FeedList() {
	const search = useSearch({ from: "/" });
	
	const {
		data,
		status,
		error,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isFetchNextPageError,
		isFetchPreviousPageError,
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
		hasPreviousPage,
	} = useFeed({
		orderByField: search.orderByField,
		sortDirection: search.sortDirection,
	});
	
	const trees = data?.pages.flatMap((page) => page.data) || [];
	const hasTrees = trees.length > 0;
	const isFirstLoad = status === "pending" && !data;

	const parentRef = useRef<HTMLDivElement>(null);

	// Add 1 extra item for the load more sentinel when there's more to load
	const itemCount = hasNextPage ? trees.length + 1 : trees.length;

	const virtualizer = useVirtualizer({
		count: itemCount,
		getScrollElement: () => parentRef.current,
		estimateSize: (index) => index < trees.length ? 500 : 1,
		overscan: 5,
	});

	const virtualItems = virtualizer.getVirtualItems();

	if (status === "error" && !hasTrees) {
		return (
			<FeedStatusCard
				icon="🌳"
				title="Failed to load feed"
				description="Please try again later"
			/>
		);
	}

	if (status === "success" && !hasTrees) {
		return (
			<FeedStatusCard
				icon="🌱"
				title="No trees yet"
				description="Check back later for new trees"
			/>
		);
	}

	return (
		<div ref={parentRef} className="h-[calc(100vh-200px)] overflow-auto">
			<div
				style={{
					height: `${virtualizer.getTotalSize()}px`,
					width: "100%",
					position: "relative",
				}}
			>
				{hasPreviousPage && !isFetchPreviousPageError && (
					<div className="py-6 sm:py-8 text-center" />
				)}

				{isFetchPreviousPageError && hasTrees && (
					<FeedActionBanner
						title="Could not load previous trees."
						onRetry={fetchPreviousPage}
						actionLabel="Try again"
					/>
				)}

				{isFetchingPreviousPage && <FeedLoadingState message="Loading previous trees..." />}

				{isFirstLoad ? (
					<FeedLoadingState message="Loading trees..." />
				) : (
					virtualItems.map((virtualItem) => {
						// Check if this is the sentinel item
						if (virtualItem.index === trees.length) {
							return (
								<div
									key={virtualItem.key}
									data-index={virtualItem.index}
									ref={virtualizer.measureElement}
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										transform: `translateY(${virtualItem.start}px)`,
									}}
								>
									{hasNextPage && !isFetchingNextPage && (
										<LoadMoreSentinel onLoadMore={fetchNextPage} />
									)}
									{isFetchingNextPage && <FeedLoadingState message="Loading trees..." />}
								</div>
							);
						}

						const tree = trees[virtualItem.index];
						return (
							<div
								key={virtualItem.key}
								data-index={virtualItem.index}
								ref={virtualizer.measureElement}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									transform: `translateY(${virtualItem.start}px)`,
									marginBottom: "1rem",
								}}
								className="sm:mb-6"
							>
								<TreeCard tree={tree} />
							</div>
						);
					})
				)}

				{isFetchNextPageError && hasTrees && (
					<FeedActionBanner
						title="Could not load more trees."
						description={error instanceof Error ? error.message : "Please try again."}
						onRetry={fetchNextPage}
						actionLabel="Try again"
					/>
				)}
			</div>
		</div>
	);
}
