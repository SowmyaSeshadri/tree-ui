import React from 'react';
import './search.css';

export default function Search(props) {
  return (
    <div className="search-box-container">
      <input
        type="text"
        id="search"
        placeholder="Search..."
        onChange={(e) => props.onSearch(e.target.value)}
      />
    </div>
  );
}
