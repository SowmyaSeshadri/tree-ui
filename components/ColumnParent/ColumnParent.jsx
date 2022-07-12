import React, { useEffect, useState } from 'react';
import ColumnChild from '../ColumnChild/ColumnChild';
import './columnparent.css';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import Checkbox from '../Checkbox/Checkbox';

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
  const [expand, setExpand] = useState(true);

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
    setCheckAll(checked);
    setCheckParent(!checkParent);
  };

  // When the checkbox of the child filter is changed
  const handleOnChangeOfChild = (id, checked) => {
    let stateOfChild = { ...childrenState };
    stateOfChild[id] = checked;

    setChildrenState(stateOfChild);

    let selectedFields = Object.values(stateOfChild).filter((f) => f);
    let updatedParentValue = selectedFields.length == 0 ? false : true;
    setCheckParent(updatedParentValue);

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

  const expandCollapseIcon = expand ? (
    <FaAngleDown onClick={handleExpandOrCollapse} />
  ) : (
    <FaAngleRight onClick={handleExpandOrCollapse} />
  );

  return (
    <div className="parent-field">
      <ul className="parent-field-list">
        <li key={fieldInfo.id} className="m-t-10 flex">
          {expandCollapseIcon}

          <div>
            <Checkbox
              id={fieldInfo.id}
              onChange={handleOnChangeOfCheckParent}
              checked={checkParent}
              label={fieldInfo.field}
            />

            <ul className={` ${expand ? 'expand' : 'collapse'}`}>
              {hasChild &&
                fieldInfo.values.map((field) => (
                  <ColumnChild
                    key={field.id}
                    data={field}
                    checkAll={checkAll}
                    onChangeOfChild={handleOnChangeOfChild}
                  />
                ))}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
