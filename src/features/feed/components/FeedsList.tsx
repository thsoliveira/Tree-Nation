import { useFeed } from "../../../hooks/use-feed"


export function FeedList() {
  const { data, status, isFetchingNextPage } = useFeed()
  const trees = data?.pages.flatMap((page) => page.data) || []
  const isFirstLoad = status === 'pending' && !data


  if (status === 'error') {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm">
        <div className="text-4xl mb-4">🌳</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load feed</h2>
        <p className="text-gray-500">Please try again later</p>
      </div>
    )
  }

  if (status === 'success' && trees.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm">
        <div className="text-4xl mb-4">🌱</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No trees yet</h2>
        <p className="text-gray-500">Check back later for new trees</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {!isFirstLoad  && (
        trees.map((tree) => (
         <div key={tree.id} className="flex items-center gap-4 bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold text-gray-900">{'Tree'}</h3>
              <p className="text-sm text-gray-500">Planted on</p>
          </div>
        ))
      )}
      
      {!isFirstLoad && isFetchingNextPage && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-500 mt-2">Loading trees...</p>
        </div>
      )}
      
    </div>
  )
}