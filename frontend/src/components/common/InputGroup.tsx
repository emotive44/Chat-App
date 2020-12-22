import React, { FC } from 'react';

import { InputContainer } from './InputGroup.styles';

interface InputGroupProps {
  label: string;
  type: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const InputGroup: FC<InputGroupProps> = ({ label, type, value, onChange }) => {
  const labelTLC = label.toLowerCase();
  return (
    <InputContainer>
      <label htmlFor={labelTLC}>Your {label}</label>
      <input type={type} id={labelTLC} name={labelTLC} value={value} onChange={onChange} />
    </InputContainer>
  )
}

export default InputGroup;
