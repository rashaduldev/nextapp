'use client';

import SkeletonCard from "./SkeletonCard";
import ThemeCard from "./ThemeCard";

export default function ThemeGrid({ items = [], loading = false, sortField  }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!items.length) return <div className="text-center py-12">No results found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((it) => (
        <ThemeCard key={it.name || Math.random()} item={it} highlightField={sortField} />
      ))}
    </div>
  );
}