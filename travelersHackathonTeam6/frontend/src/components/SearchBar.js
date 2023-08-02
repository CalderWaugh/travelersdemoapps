import React from "react";
import './style/SearchBar.css'

function SearchBar({ searchQuery, handleSearchQuery, selectedSearch, handleSelectedSearch, searchParams, onSearch }) {

  const handleSearch = () => {
    onSearch(searchQuery, selectedSearch);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className='search-container'>
      <input
        className='search-input'
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
      />

      <select
        className='search-options'
        value={selectedSearch}
        onChange={(e) => handleSelectedSearch(e.target.value)}
      >
        {searchParams.map((param) => (
          <option key={param} value={param} className='search-option'>
            {param}
          </option>
        ))}
      </select>

      <button className='search-button' onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
