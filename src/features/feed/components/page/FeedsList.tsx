
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useFeed } from "../../queries/feedQueries";
import { FeedbackBanner } from "../ui/FeedbackBanner";
import { Button } from "../../../../shared/components/Button";
import { FeedLoadingState } from "../ui/FeedLoadingState";
import { FeedStatusCard } from "../ui/FeedStatusCard";
import { TreeCard } from "../ui/TreeCard";

export function FeedList() {
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
	} = useFeed({ orderByField: "score", sortDirection: "DESC" });

	const trees = data?.pages.flatMap((page) => page.data) || [];
	const hasTrees = trees.length > 0;
	const isFirstLoad = status === "pending" && !data;

	const parentRef = useRef<HTMLDivElement>(null);
	const lastIndexRef = useRef(-1);

	const virtualizer = useVirtualizer({
		count: trees.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 500,
		overscan: 5,
	});

	const virtualItems = virtualizer.getVirtualItems();

	if (virtualItems.length > 0) {
		const lastVirtualItem = virtualItems[virtualItems.length - 1];
		if (
			lastVirtualItem.index >= trees.length - 1 &&
			lastVirtualItem.index > lastIndexRef.current &&
			hasNextPage &&
			!isFetchingNextPage
		) {
			lastIndexRef.current = lastVirtualItem.index;
			void fetchNextPage();
		}
	}

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
				role="feed"
				aria-live="polite"
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
					<FeedbackBanner title="Could not load previous trees.">
						<Button
							type="button"
							onClick={() => fetchPreviousPage()}
							variant="warning"
							size="sm"
						>
							Try again
						</Button>
					</FeedbackBanner>
				)}

				{isFetchingPreviousPage && (
					<FeedLoadingState message="Loading previous trees..." />
				)}

				{isFirstLoad ? (
					<FeedLoadingState message="Loading trees..." />
				) : (
					virtualItems.map((virtualItem) => {
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

				{!isFirstLoad && isFetchingNextPage && (
					<FeedLoadingState message="Loading trees..." />
				)}

				{isFetchNextPageError && hasTrees && (
					<FeedbackBanner
						title="Could not load more trees."
						description={
							error instanceof Error ? error.message : "Please try again."
						}
					>
						<Button
							type="button"
							onClick={() => void fetchNextPage()}
							variant="warning"
							size="sm"
						>
							Try again
						</Button>
					</FeedbackBanner>
				)}

				{hasNextPage && !isFetchNextPageError && (
					<div className="py-6 sm:py-8 text-center" />
				)}
			</div>
		</div>
	);
}
