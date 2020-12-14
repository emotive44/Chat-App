import React, { FC } from 'react';

interface InputGroupProps {
  label: string;
  type: string;
}

const InputGroup: FC<InputGroupProps> = ({ label, type }) => {
  const labelTLC = label.toLowerCase();
  return (
    <div>
      <label htmlFor={labelTLC}>Your {label}</label>
      <input type={type} id={labelTLC} name={labelTLC} />
    </div>
  )
}

export default InputGroup;
