import { useState } from "react";

const FiltersDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleApplyFilters = () => {
    // Apply the selected filters
    console.log("Applied filters:", selectedFilters);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Filters</button>
      {isOpen && (
        <div className="absolute bg-white shadow-lg p-4">
          <h3>Filters</h3>
          <label>
            <input
              type="checkbox"
              value="filter1"
              onChange={() => handleFilterChange("filter1")}
            />
            Filter 1
          </label>
          <label>
            <input
              type="checkbox"
              value="filter2"
              onChange={() => handleFilterChange("filter2")}
            />
            Filter 2
          </label>
          <button onClick={handleApplyFilters}>Apply</button>
        </div>
      )}
    </div>
  );
};
export default FiltersDropdown;
