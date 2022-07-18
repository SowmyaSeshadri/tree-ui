import React, { useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { BsCheck2, BsFillPencilFill, BsXCircle } from 'react-icons/bs';
import InputTextField from '../InputTextField/InputTextField';

export default function ColumnChild(props) {
  // Init values
  const fieldInfo = props.data;
  const checkAll = props.checkAll;

  // States
  const [checkCurrent, setCheckCurrent] = useState(checkAll);
  const [editMode, setEditMode] = useState(false);
  const [fieldName, setFieldName] = useState(fieldInfo.field);

  // Use effects
  useEffect(() => {
    setCheckCurrent(checkAll);
  }, [checkAll]);

  // Handlers
  const handleOnCheckCurrent = (id, checked) => {
    setCheckCurrent(!checkCurrent);
    props.onChangeOfChild(id, checked);
  };

  const handleEditField = (id) => {
    props.onEdit(id, fieldName);
    setEditMode(!editMode);
  };

  const actionIcons = !editMode ? (
    <span className="flex">
      <BsXCircle
        className="action-icon"
        onClick={() => props.onDelete(fieldInfo.id)}
      />
      <BsFillPencilFill
        className="action-icon"
        onClick={() => setEditMode(true)}
      />
    </span>
  ) : (
    ''
  );

  const viewOrEditField = editMode ? (
    <div>
      <InputTextField
        value={fieldName}
        onChange={(value) => setFieldName(value)}
      />
      <BsCheck2 onClick={() => handleEditField(fieldInfo.id)} />
    </div>
  ) : (
    <Checkbox
      id={fieldInfo.id}
      onChange={handleOnCheckCurrent}
      checked={checkCurrent}
      label={fieldInfo.field}
    />
  );

  return (
    <li key={fieldInfo.id} className="m-t-10 filter-list">
      {viewOrEditField}
      {actionIcons}
    </li>
  );
}
