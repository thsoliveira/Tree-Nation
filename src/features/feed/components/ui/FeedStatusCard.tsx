interface FeedStatusCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeedStatusCard({ icon, title, description }: FeedStatusCardProps) {
  return (
    <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-sm">
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{icon}</div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
