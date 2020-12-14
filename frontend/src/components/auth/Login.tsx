import React, { FC, useState } from 'react'
import './Form.css';

import InputGroup from '../common/InputGroup';

const Login: FC = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setState(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitHandler = () => {
    console.log(state);
  }

  return (
    <section className="form-wrapper">
      <InputGroup 
        label='Email' 
        type='email' 
        value={state.email} 
        onChange={inputChangeHandler}
      />
      <InputGroup 
        label='Password' 
        type='password' 
        value={state.password}
        onChange={inputChangeHandler}
      />
      <button onClick={submitHandler}>Login</button>
    </section>
  )
}

export default Login;
