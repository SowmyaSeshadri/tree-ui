import React, { useState } from 'react';
export default function InputTextField(props) {
  const [value, setValue] = useState(props.initialValue);

  return (
    <div>
      <input
        type="text"
        value={value}
        name={props.id}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
