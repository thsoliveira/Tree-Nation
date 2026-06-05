interface FeedLoadingStateProps {
  message: string;
}

export function FeedLoadingState({ message }: FeedLoadingStateProps) {
  return (
    <div className="text-center py-6 sm:py-8">
      <div className="inline-block animate-spin rounded-full h-7 w-7 sm:h-8 sm:w-8 border-4 border-blue-500 border-t-transparent"></div>
      <p className="text-gray-500 mt-2">{message}</p>
    </div>
  );
}
