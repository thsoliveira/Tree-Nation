import { FeedList } from "../features/feed/components/FeedsList";

export default function Feed() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <span className="text-2xl">🌳</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tree Feed</h1>
              <p className="text-sm text-gray-500">Discover trees planted around the world</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <FeedList />
      </main>
    </div>
  )
}