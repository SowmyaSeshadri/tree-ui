import React from 'react';
export default function InputTextField(props) {
  return (
    <div>
      <input
        type="text"
        value={props.value}
        name={props.id}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
