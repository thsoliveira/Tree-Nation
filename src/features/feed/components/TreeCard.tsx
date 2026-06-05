import { useState } from 'react'
import { ActivityList } from './ActivityList'
import { TreeImage } from './TreeImage'
import { formatDate } from '../../../shared/utils'
import type { Tree } from '../types'
import { useTreeInteractions } from '../hooks/use-tree-interactions'

interface TreeCardProps {
  tree: Tree
}

export function TreeCard({ tree }: TreeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(tree.likes_count)
  const { activities, isLoading, isError } = useTreeInteractions(tree.id.toString(), isExpanded)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <TreeImage src={tree.image || ''} alt={tree.species || 'Tree'} />

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4 flex-wrap gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {tree.species || tree.message || 'A New Tree'}
            </h3>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              {formatDate(tree.birth_date)}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:ml-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 transition-colors ${
                isLiked ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <svg 
                className="w-5 h-5" 
                fill={isLiked ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-medium">{likeCount}</span>
            </button>
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-medium">{tree.comments_count}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2.5 rounded-xl bg-green-50 text-green-700 font-medium hover:bg-green-100 transition-colors"
        >
          {isExpanded ? 'Hide Activity' : 'View Activity'}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-4 sm:p-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Activity
            </h4>
            <ActivityList
              activities={activities}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </div>
      )}
    </div>
  )
}