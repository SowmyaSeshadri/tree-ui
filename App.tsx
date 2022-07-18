import React, { useEffect, useState } from 'react';
import './style.css';
import Search from './components/Search/Search.jsx';
import ColumnParent from './components/ColumnParent/ColumnParent.jsx';
import { COLUMN_FILTERS } from './data/MockData.js';
import { FaRedo } from 'react-icons/fa';

export default function App() {
  let columnFilters = JSON.parse(JSON.stringify(COLUMN_FILTERS));

  // States
  const [columnData, setColumnData] = useState(columnFilters);
  const [searchTerm, setSearchTerm] = useState('');

  // Use effects
  useEffect(() => {
    if (searchTerm == '') {
      setColumnData(columnFilters);
    } else {
      let filteredData = findFilteredData(searchTerm, columnData);
      setColumnData(filteredData);
    }
  }, [searchTerm]);

  // Handlers
  const handleOnSearch = (data) => {
    setSearchTerm(data);
  };

  const handleDeleteFilter = (id) => {
    let filteredData = removeData(id, columnData);
    setColumnData(filteredData);
  };

  const handleEditData = (id, value) => {
    let updatedField = false;
    let dataToEdit = [...columnData];
    dataToEdit.map((data) => {
      if (data.id == id) {
        data.field = value;
        updatedField = true;
      }

      if (data.values.length > 0 && !updatedField) {
        data.values.map((d) => {
          if (d.id == id) {
            d.field = value;
            updatedField = true;
          }
        });
      }
    });
    setColumnData(dataToEdit);
  };

  const removeData = (id, data) => {
    let filteredData = [];
    filteredData = data.filter((d) => d.id != id);

    filteredData = filteredData.map((d) => {
      if (d.values.length > 0) {
        let updatedValues = removeData(id, d.values);
        d.values = updatedValues;
      }
      return d;
    });
    return filteredData;
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

  const handleRefresh = () => {
    let data = columnFilters;
    setColumnData(data);
  };

  return (
    <div>
      <Search searchTerm={searchTerm} onSearch={handleOnSearch} />
      <span className="refresh">
        <FaRedo onClick={handleRefresh} />
      </span>

      {columnData.map((field, index) => (
        <ColumnParent
          key={index}
          data={field}
          onDelete={handleDeleteFilter}
          onEdit={handleEditData}
        />
      ))}
    </div>
  );
}
