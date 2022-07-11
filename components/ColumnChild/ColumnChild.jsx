import React, { useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
export default function ColumnChild(props) {
  const fieldInfo = props.data;
  const checkAll = props.checkAll;
  const [checkCurrent, setCheckCurrent] = useState(checkAll);

  useEffect(() => {
    setCheckCurrent(checkAll);
  }, [checkAll]);

  const handleOnCheckCurrent = (id, checked) => {
    setCheckCurrent(!checkCurrent);
    props.onChangeOfChild(id, checked);
  };

  return (
    <li key={fieldInfo.id}>
      <Checkbox
        id={fieldInfo.id}
        onChange={handleOnCheckCurrent}
        checked={checkCurrent}
      />

      <label htmlFor={fieldInfo.id}>{fieldInfo.field}</label>
    </li>
  );
}
