import React, { useEffect } from 'react';
import ColumnFilterNode from '../ColumnFilterNode/ColumnFilterNode';

export default function ColumnFilter(props) {
  return (
    <div>
      {props.data.map((filter, i) => (
        <ColumnFilterNode
          node={filter}
          key={i}
          isParentChecked={props.checkMainFilter}
        />
      ))}
    </div>
  );
}
