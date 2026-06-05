import { useInView } from "react-intersection-observer";
import { useSearch } from "@tanstack/react-router";
import { TreeCard } from "../ui/TreeCard";
import { FeedActionBanner } from "../ui/FeedActionBanner";
import { FeedLoadingState } from "../ui/FeedLoadingState";
import { FeedStatusCard } from "../ui/FeedStatusCard";
import { useFeed } from "../../queries/feedQueries";

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

	const { ref: bottomRef } = useInView({
		threshold: 0.1,
		onChange: (inView) => {
			if (inView && hasNextPage && !isFetchingNextPage) {
				void fetchNextPage();
			}
		},
	});

	const { ref: topRef } = useInView({
		threshold: 0.1,
		onChange: (inView) => {
			if (inView && hasPreviousPage && !isFetchingPreviousPage) {
				void fetchPreviousPage();
			}
		},
	});

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
		<div className="space-y-4 sm:space-y-6">
			{hasPreviousPage && !isFetchPreviousPageError && (
				<div ref={topRef} className="py-6 sm:py-8 text-center" />
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
				trees.map((tree) => <TreeCard key={tree.id} tree={tree} />)
			)}

			{!isFirstLoad && isFetchingNextPage && <FeedLoadingState message="Loading trees..." />}

			{isFetchNextPageError && hasTrees && (
				<FeedActionBanner
					title="Could not load more trees."
					description={error instanceof Error ? error.message : "Please try again."}
					onRetry={fetchNextPage}
					actionLabel="Try again"
				/>
			)}

			{hasNextPage && !isFetchNextPageError && (
				<div ref={bottomRef} className="py-6 sm:py-8 text-center" />
			)}
		</div>
	);
}
