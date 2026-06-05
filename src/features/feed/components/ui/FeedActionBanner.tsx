interface FeedActionBannerProps {
  title: string;
  description?: string;
  onRetry: () => void;
  actionLabel: string;
}

export function FeedActionBanner({
  title,
  description,
  onRetry,
  actionLabel,
}: FeedActionBannerProps) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
      <p className="text-sm font-medium text-amber-900">{title}</p>
      {description && <p className="mt-1 text-sm text-amber-700">{description}</p>}
      <button
        type="button"
        onClick={() => void onRetry()}
        className="mt-3 rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
      >
        {actionLabel}
      </button>
    </div>
  );
}
