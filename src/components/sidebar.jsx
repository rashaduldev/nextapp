"use client";
import clsx from "clsx";

export default function Sidebar({
  filterLists = {},
  selected = new Set(),
  onToggle = () => {},
}) {
  return (
    <aside className="fixed top-0 left-0 w-64 p-4 hidden md:block h-screen overflow-y-auto bg-gray-100 scrollbar-hide">
      <h2 className="text-3xl text-center mb-5 font-semibold">Themes</h2>
      {Object.entries(filterLists).map(([filterName, options]) => (
        <div key={filterName} className="mb-6">
          <h4 className="text-lg font-semibold capitalize mb-2">
            {filterName}
          </h4>
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <label
                key={option.name}
                className="flex items-center justify-between gap-2 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.has(`${filterName}:${option.name}`)}
                    onChange={() =>
                      onToggle(`${filterName}:${option.name}`)
                    }
                    className="h-4 w-4"
                  />
                  <span
                    className={clsx(
                      "text-sm",
                      selected.has(`${filterName}:${option.name}`) &&
                        "font-semibold"
                    )}
                  >
                    {option.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{option.count}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
