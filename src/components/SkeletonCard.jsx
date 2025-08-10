export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl p-4">
      <div className="bg-gray-200 h-40 mb-3 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}