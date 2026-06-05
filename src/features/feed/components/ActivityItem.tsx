import { formatDate } from "../../../shared/utils"
import type { Activity } from "../types"

interface ActivityItemProps {
  activity: Activity
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const user = activity.author
  const fullName = user?.full_name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'User'

  return (
    <div className="flex gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white border border-gray-100">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{fullName}</span>
          <span className="text-gray-600">
            {activity.type === 'comment' ? ' commented' : ' liked'}
          </span>
        </p>
        {activity.type === 'comment' && activity.content && (
          <p className="text-sm text-gray-700 mt-1">{activity.content}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {formatDate(activity.created_at)}
        </p>
      </div>
    </div>
  )
}