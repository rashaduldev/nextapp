"use client";
import { useEffect, useState } from "react";

export default function Sidebar({ onFilterChange }) {
  const [datas, setDatas] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    cms: [],
    css: [],
  });

  useEffect(() => {
    fetch("https://astrothemes.club/data/themes.json")
      .then((response) => response.json())
      .then((json) => {
        setDatas(json);
      })
      .catch((error) =>
        console.error("Error fetching from Api Data:", error)
      );
  }, []);

  const getLimitedCategories = (key, limit) => {
    return [...new Set(datas.map((data) => data.data[key]).filter(Boolean))].slice(0, limit);
  };

  return (
    <div className="p-4 border-r border-gray-300">
      {/* Category */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Category</h3>
        {getLimitedCategories("category",2).map((item, index) => (
          <label key={index} className="block text-sm">
            <input type="checkbox" className="mr-2" />
            {item}
          </label>
        ))}
      </div>

      {/* CMS */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">CMS</h3>
        {getLimitedCategories("cms", 2).map((item, index) => (
          <label key={index} className="block text-sm">
            <input type="checkbox" className="mr-2" />
            {item}
          </label>
        ))}
      </div>

      {/* CSS */}
      <div>
        <h3 className="font-bold mb-2">CSS</h3>
        {getLimitedCategories("css", 2).map((item, index) => (
          <label key={index} className="block text-sm">
            <input type="checkbox" className="mr-2" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
