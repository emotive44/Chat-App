import React, { FC } from 'react';

interface InputGroupProps {
  label: string;
  type: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const InputGroup: FC<InputGroupProps> = ({ label, type, value, onChange }) => {
  const labelTLC = label.toLowerCase();
  return (
    <div>
      <label htmlFor={labelTLC}>Your {label}</label>
      <input type={type} id={labelTLC} name={labelTLC} value={value} onChange={onChange} />
    </div>
  )
}

export default InputGroup;
