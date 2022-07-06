import React from 'react';

export default function Search(props) {
  return (
    <div>
      <input
        type="text"
        id="search"
        placeholder="Search..."
        onChange={(e) => props.onSearch(e.target.value)}
      />
    </div>
  );
}
