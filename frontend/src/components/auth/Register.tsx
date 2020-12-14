import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

import InputGroup from '../common/InputGroup';

const Register:FC = () => {
  const [state, setState] = useState({
    name: '',
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
    <section className="form-wrapper" style={{ height: '29rem' }}>
      <InputGroup 
        label='Name' 
        type='text' 
        value={state.name} 
        onChange={inputChangeHandler}
      />
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
      <button onClick={submitHandler}>Register</button>
      <p>
        <Link to='/register'>
          If you have account go to Login.
        </Link>
      </p>
    </section>
  )
}

export default Register;
