'use client';
import React from 'react';

export default function Toolbar({ sort = 'github_star_desc', onSort = () => {} }) {
  return (
    <div className="flex items-center justify-between mb-4 md:ml-64">
      <label className="text-sm">Sort by:</label>
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className="ml-2 p-1 border rounded"
      >
        <option value="github_star_desc">GitHub Stars</option>
        <option value="github_fork_asc">GitHub Forks</option>
        <option value="price_asc">Price</option>
        <option value="name_desc">Name</option>
      </select>
    </div>
  );
}
