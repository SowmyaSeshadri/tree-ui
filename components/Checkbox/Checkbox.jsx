import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import './checkbox.css';

export default function Checkbox(props) {
  // Init values
  const checked = props.checked;

  // States
  const [currentChecked, setCurrentChecked] = useState(checked);

  // Use effects
  useEffect(() => {
    setCurrentChecked(checked);
  }, [checked]);

  // Handlers
  const handleOnCheck = (e) => {
    props.onChange(e.currentTarget.id, !checked);
  };

  const iconToDisplay = currentChecked ? <FaCheck size="10" /> : '';

  return (
    <div className="flex">
      <div
        className={`checkbox-container ${currentChecked ? 'check' : 'uncheck'}`}
        onClick={handleOnCheck}
        id={props.id}
      >
        {iconToDisplay}
      </div>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}
