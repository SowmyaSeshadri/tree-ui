import React, { useEffect, useState } from 'react';
import './style.css';
import Search from './components/Search/Search.jsx';
import ColumnParent from './components/ColumnParent/ColumnParent.jsx';
import { COLUMN_FILTERS } from './data/MockData.js';

export default function App() {
  // States
  const [columnData, setColumnData] = useState(COLUMN_FILTERS);
  const [searchTerm, setSearchTerm] = useState('');

  // Use effects
  useEffect(() => {
    if (searchTerm == '') {
      setColumnData(COLUMN_FILTERS);
    } else {
      let filteredData = findFilteredData(searchTerm, COLUMN_FILTERS);
      setColumnData(filteredData);
    }
  }, [searchTerm]);

  // Handlers
  const handleOnSearch = (data) => {
    console.log('Search term: ', data);
    setSearchTerm(data);
  };

  const findFilteredData = (searchTerm, dataToFilter) => {
    let filteredData = [];
    dataToFilter.map((data) => {
      let name = data.field.toLowerCase();
      if (name.includes(searchTerm)) {
        filteredData.push(data);
      }

      if (data.values.length > 0) {
        let fData = findFilteredData(searchTerm, data.values);
        if (fData.length > 0 && filteredData.indexOf(data) === -1) {
          filteredData.push(data);
        }
      }
    });
    return filteredData;
  };

  return (
    <div>
      <Search searchTerm={searchTerm} onSearch={handleOnSearch} />
      {columnData.map((field, index) => (
        <ColumnParent key={index} data={field} />
      ))}
    </div>
  );
}
