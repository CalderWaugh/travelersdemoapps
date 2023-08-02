import React, { useState } from "react";
import './style/FilterBox.css';

function FilterBox({ filters, onSearch, selectedFilters, handleSelectedFilters }) {

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterSelection = (filterCategory, filterValue) => {
    handleSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [filterCategory]: {
        ...(prevSelectedFilters[filterCategory] || {}),
        [filterValue]: !prevSelectedFilters[filterCategory]?.[filterValue],
      },
    }));
  };

  const handleApply = () => {
    onSearch();
    setIsOpen(false);
  };

  if (!filters) {
    return null;
  }

  return (
    <div className="filter-container">
      <div className="filter-bar">
        <button onClick={handleFilterToggle} className="filter-button">Filters</button>
      </div>
      {isOpen && (
        <div className="filter-dropdown">
          {Object.keys(filters).map((filterCategory) => (
            <div key={filterCategory} className="filter-category">
              <h4>{filterCategory}</h4>
              {filters[filterCategory].map((filterValue) => (
                <label key={filterValue}>
                  <input
                    type="checkbox"
                    checked={
                      selectedFilters[filterCategory]?.[filterValue] || false
                    }
                    onChange={() =>
                      handleFilterSelection(filterCategory, filterValue)
                    }
                  />
                  {filterValue}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleApply}>Apply Filters</button>
        </div>
      )}
    </div>
  );
}

export default FilterBox;
