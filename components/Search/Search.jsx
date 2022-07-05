import React from 'react';

export default function Search(props) {
  return (
    <div>
      <label htmlFor="search"> Search field </label>
      <input
        type="text"
        id="search"
        onChange={(e) => props.onSearch(e.target.value)}
      />
    </div>
  );
}
