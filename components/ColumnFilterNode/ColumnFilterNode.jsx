import React, { useState, useEffect } from 'react';
import ColumnFilter from '../ColumnFilter/ColumnFilter';

export default function ColumnFilterNode(props) {
  const filter = props.node;
  const hasChild = filter.values ? true : false;

  // If this value is checked, all its children should be checked as well.
  const [checkMainFilter, setCheckMainFilter] = useState(props.isParentChecked);

  const onChangeOfMainFilter = () => {
    setCheckMainFilter(!checkMainFilter);
  };

  console.log('checkMainFilter', checkMainFilter, filter.field);

  useEffect(() => console.log(checkMainFilter), [checkMainFilter]);

  return (
    <div>
      <ul>
        <li key={filter.id}>
          <input
            type="checkbox"
            id={filter.id}
            onChange={onChangeOfMainFilter}
            checked={checkMainFilter}
          />
          <label htmlFor={filter.id}>{filter.field}</label>
        </li>
        {hasChild && (
          <ColumnFilter
            data={filter.values}
            checkMainFilter={checkMainFilter}
          />
        )}
      </ul>
    </div>
  );
}
