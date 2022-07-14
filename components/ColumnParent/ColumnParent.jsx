import React, { useEffect, useState, useRef } from 'react';
import ColumnChild from '../ColumnChild/ColumnChild';
import './columnparent.css';
import { FaAngleDown, FaAngleRight, FaTrashAlt } from 'react-icons/fa';
import { BsXCircle, BsFillPencilFill, BsCheck2 } from 'react-icons/bs';
import Checkbox from '../Checkbox/Checkbox';
import InputTextField from '../InputTextField/InputTextField';

export default function ColumnParent(props) {
  // Init values
  const fieldInfo = props.data;
  const hasChild = fieldInfo.values ? true : false;
  const initialStateOfChildren = () => {
    let childrenState = {};
    fieldInfo.values.map((value) => {
      childrenState[value.id] = false;
    });
    return childrenState;
  };

  // States
  const [checkParent, setCheckParent] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [childrenState, setChildrenState] = useState(initialStateOfChildren());
  const [checkParentPartially, setCheckParentPartially] = useState(false);
  const [expand, setExpand] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Use effects
  useEffect(() => {
    let stateOfChild = {};
    Object.keys(childrenState).forEach((a) => {
      stateOfChild[a] = checkAll;
    });
    setChildrenState(stateOfChild);
  }, [checkAll]);

  // Handlers

  // When the checkbox of the parent filter is changed
  const handleOnChangeOfCheckParent = (id, checked) => {
    setCheckParentPartially(false);
    setCheckAll(checked);
    setCheckParent(checked);
  };

  // When the checkbox of the child filter is changed
  const handleOnChangeOfChild = (id, checked) => {
    let stateOfChild = { ...childrenState };
    stateOfChild[id] = checked;

    setChildrenState(stateOfChild);

    // For setting the partial / selected icon for the parent field.
    let selectedFields = Object.values(stateOfChild).filter((f) => f);
    if (
      selectedFields.length != Object.values(stateOfChild).length &&
      selectedFields.length != 0
    ) {
      setCheckParentPartially(true);
    } else {
      let updatedParentValue = selectedFields.length == 0 ? false : true;
      setCheckParentPartially(false);
      setCheckParent(updatedParentValue);
    }

    // To ensure that the checkAll state always holds the right value.
    if (selectedFields.length == Object.keys(childrenState).length) {
      setCheckAll(true);
    } else if (selectedFields.length == 0) {
      setCheckAll(false);
    }
  };

  // Handler for expand / collapse.
  const handleExpandOrCollapse = () => {
    setExpand(!expand);
  };

  const handleEditField = (id) => {};

  const expandCollapseIcon = expand ? (
    <FaAngleDown onClick={handleExpandOrCollapse} />
  ) : (
    <FaAngleRight onClick={handleExpandOrCollapse} />
  );

  const viewOrEditField = editMode ? (
    <div>
      <InputTextField initialValue={fieldInfo.field} />
      <BsCheck2 onClick={() => handleEditField(fieldInfo.id)} />
    </div>
  ) : (
    <Checkbox
      id={fieldInfo.id}
      onChange={handleOnChangeOfCheckParent}
      checked={checkParent}
      label={fieldInfo.field}
      partialCheck={checkParentPartially}
    />
  );

  const editIcon = !editMode ? (
    <span className="delete-icon flex">
      <BsFillPencilFill onClick={() => setEditMode(true)} />
    </span>
  ) : (
    ''
  );

  const deleteIcon = !editMode ? (
    <span className="delete-icon flex">
      <BsXCircle onClick={() => props.onDelete(fieldInfo.id)} />
    </span>
  ) : (
    ''
  );

  return (
    <div className="parent-field">
      <ul className="parent-field-list">
        <li key={fieldInfo.id} className="m-t-10 inline-flex">
          {expandCollapseIcon}

          <div>
            <div className="filter-list">
              {viewOrEditField}
              {deleteIcon}
              {editIcon}
            </div>

            <ul className={` ${expand ? 'expand' : 'collapse'}`}>
              {hasChild &&
                fieldInfo.values.map((field) => (
                  <ColumnChild
                    key={field.id}
                    data={field}
                    checkAll={checkAll}
                    onChangeOfChild={handleOnChangeOfChild}
                    onDelete={props.onDelete}
                  />
                ))}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
