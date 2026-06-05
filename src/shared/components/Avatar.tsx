import { useState } from 'react'
import { cleanImageUrl } from '../utils'

interface AvatarProps {
  src?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-12 h-12 text-base',
}

const sizeToThumbnail = {
  sm: '32x32',
  md: '64x64',
  lg: '128x128',
  xl: '256x256',
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const [imageError, setImageError] = useState(false)
  const cleanedSrc = cleanImageUrl(src, sizeToThumbnail[size])
  const initials = name?.charAt(0).toUpperCase() ?? '?'

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0`}>
      {cleanedSrc && !imageError ? (
        <img
          src={cleanedSrc}
          alt={name ?? 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
          {initials}
        </div>
      )}
    </div>
  )
}