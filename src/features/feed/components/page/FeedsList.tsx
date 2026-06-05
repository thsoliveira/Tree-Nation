
import { useFeed } from "../../queries/feedQueries";
import { FeedbackBanner } from "../ui/FeedbackBanner";
import { Button } from "../../../../shared/components/Button";
import { FeedLoadingState } from "../ui/FeedLoadingState";
import { FeedStatusCard } from "../ui/FeedStatusCard";
import { TreeCard } from "../ui/TreeCard";
import { InfiniteScrollLoader } from "../ui/InfiniteScrollLoader";

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
		<div>
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

			<div role="feed" aria-live="polite">
				{isFirstLoad ? (
					<FeedLoadingState message="Loading trees..." />
				) : (
					trees.map((tree) => (
						<div key={tree.id} className="mb-4 sm:mb-6">
							<TreeCard tree={tree} />
						</div>
					))
				)}
			</div>

			{!isFirstLoad && hasNextPage && (
				<InfiniteScrollLoader
					isLoading={isFetchingNextPage}
					hasMore={hasNextPage}
					onLoadMore={() => fetchNextPage()}
				/>
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
	);
}
