import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import './checkbox.css';

export default function Checkbox(props) {
  const checked = props.checked;

  const [currentChecked, setCurrentChecked] = useState(checked);

  useEffect(() => {
    setCurrentChecked(checked);
  }, [checked]);

  const iconToDisplay = currentChecked ? <FaCheck size="10" /> : '';

  const handleOnCheck = (e) => {
    props.onChange(e.currentTarget.id, !checked);
  };

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
