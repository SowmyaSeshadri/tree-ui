import React, { useEffect, useState } from 'react';
import './style.css';
import Search from './components/Search/Search.jsx';
import ColumnParent from './components/ColumnParent/ColumnParent.jsx';
import { COLUMN_FILTERS } from './data/MockData.js';

export default function App() {
  const [columnData, setColumnData] = useState(COLUMN_FILTERS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnSearch = (data) => {
    console.log('Search term: ', data);
    setSearchTerm(data);
  };

  useEffect(() => {
    if (searchTerm == '') {
      setColumnData(COLUMN_FILTERS);
    } else {
      let filteredData = COLUMN_FILTERS.filter((data) => {
        let name = data.field.toLowerCase();
        return name.includes(searchTerm);
      });
      setColumnData(filteredData);
    }
  }, [searchTerm]);

  return (
    <div>
      <Search searchTerm={searchTerm} onSearch={handleOnSearch} />
      {columnData.map((field, index) => (
        <ColumnParent key={index} data={field} />
      ))}
    </div>
  );
}
