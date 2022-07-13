import React, { useEffect, useState } from 'react';
import { FaCheck, FaMinus } from 'react-icons/fa';
import './checkbox.css';

export default function Checkbox(props) {
  // Init values
  const checked = props.checked;
  const initialPartialCheck = props.partialCheck;

  // States
  const [currentChecked, setCurrentChecked] = useState(checked);
  const [partialCheck, setPartialCheck] = useState(initialPartialCheck);

  // Use effects
  useEffect(() => {
    setCurrentChecked(checked);
  }, [checked]);

  useEffect(() => {
    setPartialCheck(initialPartialCheck);
  }, [initialPartialCheck]);

  // Handlers
  const handleOnCheck = (e) => {
    props.onChange(e.currentTarget.id, !checked);
  };

  const iconToDisplay = partialCheck ? (
    <FaMinus size="10" />
  ) : currentChecked ? (
    <FaCheck size="10" />
  ) : (
    ''
  );

  const classForIcon = partialCheck
    ? 'partial-check'
    : currentChecked
    ? 'check'
    : 'uncheck';

  return (
    // TODO: This should be an input type checkbox field for accessibility concerns.
    <div className="inline-flex" onClick={handleOnCheck} id={props.id}>
      <div className={`checkbox-container ${classForIcon}`}>
        {iconToDisplay}
      </div>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}
