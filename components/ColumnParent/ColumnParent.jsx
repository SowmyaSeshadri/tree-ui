import React, { useEffect, useState } from 'react';
import ColumnChild from '../ColumnChild/ColumnChild';
import './columnparent.css';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import Checkbox from '../Checkbox/Checkbox';

export default function ColumnParent(props) {
  const fieldInfo = props.data;
  const hasChild = fieldInfo.values ? true : false;

  const initialStateOfChildren = () => {
    let childrenState = {};
    fieldInfo.values.map((value) => {
      childrenState[value.id] = false;
    });
    return childrenState;
  };

  const [checkParent, setCheckParent] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [childrenState, setChildrenState] = useState(initialStateOfChildren());
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    let stateOfChild = {};
    Object.keys(childrenState).forEach((a) => {
      stateOfChild[a] = checkAll;
    });
    setChildrenState(stateOfChild);
  }, [checkAll]);

  const handleOnChangeOfCheckParent = (id, checked) => {
    console.log(checked, 'checked from parent handler ', checkAll);
    setCheckAll(checked);
    setCheckParent(!checkParent);
  };

  const handleOnChangeOfChild = (id, checked) => {
    console.log(checked);
    let stateOfChild = { ...childrenState };
    stateOfChild[id] = checked;

    setChildrenState(stateOfChild);

    let selectedFields = Object.values(stateOfChild).filter((f) => f);
    let updatedParentValue = selectedFields.length == 0 ? false : true;
    setCheckParent(updatedParentValue);
  };

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
        <li key={fieldInfo.id}>
          {expandCollapseIcon}
          {/* <input
            className="input-type"
            type="checkbox"
            id={fieldInfo.id}
            onChange={handleOnChangeOfCheckParent}
            checked={checkParent}
          /> */}

          <Checkbox
            id={fieldInfo.id}
            onChange={handleOnChangeOfCheckParent}
            checked={checkParent}
          />

          <label htmlFor={fieldInfo.id}>{fieldInfo.field}</label>

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
        </li>
      </ul>
    </div>
  );
}
