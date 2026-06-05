import { THUMBNAIL_BASE_URL, DEFAULT_THUMBNAIL_SIZE } from '../constants'

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function cleanImageUrl(
  url?: string,
  size = DEFAULT_THUMBNAIL_SIZE,
): string {
  if (!url) {
    return ''
  }

  let cleaned = url.replace(/^[\s`'"]+|[\s`'"]+$/g, '')

  if (!cleaned) {
    return ''
  }

  if (cleaned.startsWith(THUMBNAIL_BASE_URL)) {
    return cleaned
  }

  return `${THUMBNAIL_BASE_URL}/${size}/${cleaned}`
}