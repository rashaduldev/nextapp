"use client";
import React, { useState, useMemo } from "react";
import Toolbar from "./Toolbar";
import ThemeGrid from "./ThemeGrid";
import Sidebar from "./sidebar";

export default function ClientShell({ apiData = [] }) {
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price");

  // Build filter lists with counts
  const filterLists = useMemo(() => {
    const buildCountMap = (field) => {
      const map = new Map();
      apiData.forEach((item) => {
        const values = item.data?.[field] || [];
        if (Array.isArray(values)) {
          values.forEach((val) => {
            if (typeof val === "string") {
              const trimmed = val.trim();
              if (trimmed) {
                map.set(trimmed, (map.get(trimmed) || 0) + 1);
              }
            }
          });
        }
      });
      return Array.from(map.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name));
    };

    return {
      css: buildCountMap("css"),
      ui: buildCountMap("ui"),
      cms: buildCountMap("cms"),
      category: buildCountMap("category"),
    };
  }, [apiData]);

  // Toggle filter selection
  function toggle(option) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(option)) next.delete(option);
      else next.add(option);
      return next;
    });
  }

  // Filter, search, and sort the items
  const filtered = useMemo(() => {
    let arr = apiData.slice(1,100);
    console.log(arr);
    

    // Apply filters
    if (selected.size > 0) {
      const selectedByField = {
        css: new Set(),
        ui: new Set(),
        cms: new Set(),
        category: new Set(),
      };

      selected.forEach((sel) => {
        const [field, value] = sel.split(":");
        if (selectedByField[field]) selectedByField[field].add(value);
      });

      arr = arr.filter((item) => {
        const matchCss = selectedByField.css.size === 0 ||
          (item.data?.css || []).some((v) => selectedByField.css.has(v));

        const matchUi = selectedByField.ui.size === 0 ||
          (item.data?.ui || []).some((v) => selectedByField.ui.has(v));

        const matchCms = selectedByField.cms.size === 0 ||
          (item.data?.cms || []).some((v) => selectedByField.cms.has(v));

        const matchCategory = selectedByField.category.size === 0 ||
          (item.data?.category || []).some((v) =>
            selectedByField.category.has(v)
          );

        return matchCss && matchUi && matchCms && matchCategory;
      });
    }

    // Apply search
    if (search.trim()) {
      const searchLower = search.trim().toLowerCase();
      arr = arr.filter((item) =>
        item.data?.title?.toLowerCase().includes(searchLower)
      );
    }
// Apply sorting
const [field] = sort.split(); 
console.log(field);


arr.sort((a, b) => {
  const aVal = a.data?.[field];
  const bVal = b.data?.[field];

  if (field === "title" || field === "name") {
    return (aVal || "").toString().localeCompare(bVal || "");
  }

  // Always descending for numeric fields
  const aNum = typeof aVal === "number" ? aVal : aVal ? parseFloat(aVal) : -Infinity;
  const bNum = typeof bVal === "number" ? bVal : bVal ? parseFloat(bVal) : -Infinity;
  return bNum - aNum;
});

  return arr;
  }, [apiData, selected, search, sort]);
  
  const [fieldName] = sort.split("_asc"); 
  const [finalField] = fieldName.split("_desc") 

  return (
    <>
      <Sidebar filterLists={filterLists} selected={selected} onToggle={toggle}/>
      <main className="md:ml-64 min-h-screen p-6 w-[100%]">
        <div className="mb-4 flex items-center justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search themes..."
            className="p-2 border border-gray-100 focus:border-gray-200 rounded w-1/4"
          />
          <Toolbar className="md:ml-64" sort={sort} onSort={setSort} />
        </div>
        <ThemeGrid
          items={filtered}
          loading={false}
          sortField={finalField}
        />
      </main>
    </>
  );
}
