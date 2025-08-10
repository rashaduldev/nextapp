"use client";
import React, { useState, useMemo } from "react";
import Toolbar from "./Toolbar";
import ThemeGrid from "./ThemeGrid";
import Sidebar from "./sidebar";

export default function ClientShell({ initial = [] }) {
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price_asc"); // default price

  // Build filter lists with counts
  const filterLists = useMemo(() => {
    const buildCountMap = (field) => {
      const map = new Map();
      initial.forEach((item) => {
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
  }, [initial]);

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
    let arr = initial.slice();

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
        const matchCss =
          selectedByField.css.size === 0 ||
          (item.data?.css || []).some((v) => selectedByField.css.has(v));

        const matchUi =
          selectedByField.ui.size === 0 ||
          (item.data?.ui || []).some((v) => selectedByField.ui.has(v));

        const matchCms =
          selectedByField.cms.size === 0 ||
          (item.data?.cms || []).some((v) => selectedByField.cms.has(v));

        const matchCategory =
          selectedByField.category.size === 0 ||
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
    const [field, direction] = sort.split("_"); // e.g. github_star_desc

    arr.sort((a, b) => {
      if (field === "name") {
        return direction === "asc"
          ? (a.data?.title || "").localeCompare(b.data?.title || "")
          : (b.data?.title || "").localeCompare(a.data?.title || "");
      } else {
        const aVal = a.data?.[field];
        const bVal = b.data?.[field];
        const aNum =
          typeof aVal === "number"
            ? aVal
            : aVal
            ? parseFloat(aVal)
            : -Infinity;
        const bNum =
          typeof bVal === "number"
            ? bVal
            : bVal
            ? parseFloat(bVal)
            : -Infinity;
        return direction === "asc" ? aNum - bNum : bNum - aNum;
      }
    });

    return arr;
  }, [initial, selected, search, sort]);

  // Final sort field for ThemeGrid highlight
const [fieldName] = sort.split("_asc"); 
const [finalField] = fieldName.split("_desc") 

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        filterLists={filterLists}
        selected={selected}
        onToggle={toggle}
      />

      {/* Main content */}
      <main className="md:ml-64 min-h-screen p-6 w-[100%]">
        <div className="mb-4 flex items-center justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search themes..."
            className="p-2 border rounded w-1/3"
          />
          <Toolbar sort={sort} onSort={setSort} />
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
