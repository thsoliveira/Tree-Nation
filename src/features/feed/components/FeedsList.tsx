import { useFeed } from '../hooks/use-feed'
import { TreeCard } from './TreeCard'
import { useInView } from 'react-intersection-observer'

export function FeedList() {
  const {
    data,
    status,
    error,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
    hasNextPage,
  } = useFeed()
  const trees = data?.pages.flatMap((page) => page.data) || []
  const hasTrees = trees.length > 0
  const isFirstLoad = status === 'pending' && !data

  const { ref } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
  })

  if (status === 'error' && !hasTrees) {
    return (
      <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-sm">
        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌳</div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Failed to load feed</h2>
        <p className="text-gray-500">Please try again later</p>
      </div>
    )
  }

  if (status === 'success' && !hasTrees) {
    return (
      <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-sm">
        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌱</div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No trees yet</h2>
        <p className="text-gray-500">Check back later for new trees</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {isFirstLoad ? (
        <div className="text-center py-6 sm:py-8">
          <div className="inline-block animate-spin rounded-full h-7 w-7 sm:h-8 sm:w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-500 mt-2">Loading trees...</p>
        </div>
      ) : (
        trees.map((tree) => (
          <TreeCard key={tree.id} tree={tree} />
        ))
      )}
      
      {!isFirstLoad && isFetchingNextPage && (
        <div className="text-center py-6 sm:py-8">
          <div className="inline-block animate-spin rounded-full h-7 w-7 sm:h-8 sm:w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-500 mt-2">Loading trees...</p>
        </div>
      )}

      {isFetchNextPageError && hasTrees && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
          <p className="text-sm font-medium text-amber-900">Could not load more trees.</p>
          <p className="mt-1 text-sm text-amber-700">{error instanceof Error ? error.message : 'Please try again.'}</p>
          <button
            type="button"
            onClick={() => {
              void fetchNextPage()
            }}
            className="mt-3 rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            Try again
          </button>
        </div>
      )}

      {hasNextPage && !isFetchNextPageError && (
        <div ref={ref} className="py-6 sm:py-8 text-center" />
      )}
    </div>
  )
}
