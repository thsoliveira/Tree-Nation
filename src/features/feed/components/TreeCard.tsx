import type { Tree } from '../types'
import { formatDate } from '../../../shared/utils'

interface TreeCardProps {
  tree: Tree
}

export function TreeCard({ tree }: TreeCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 truncate">
              {tree.species || tree.message || 'A New Tree'}
            </h3>
            <p className="text-gray-500 mt-1">
              {formatDate(tree.birth_date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}