import React, { useEffect, useState } from 'react';
export default function ColumnChild(props) {
  const fieldInfo = props.data;
  const checkAll = props.checkAll;
  const [checkCurrent, setCheckCurrent] = useState(checkAll);

  useEffect(() => {
    setCheckCurrent(checkAll);
  }, [checkAll]);

  const handleOnCheckCurrent = (e) => {
    setCheckCurrent(!checkCurrent);
    props.onChangeOfChild(e);
  };

  return (
    <li key={fieldInfo.id}>
      <input
        type="checkbox"
        id={fieldInfo.id}
        checked={checkCurrent}
        onChange={handleOnCheckCurrent}
      />
      <label htmlFor={fieldInfo.id}>{fieldInfo.field}</label>
    </li>
  );
}
