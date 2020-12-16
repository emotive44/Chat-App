import React, { FC, useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import './Form.css';

import axios from 'axios';
import setStorage from '../../utils/setStorage';
import InputGroup from '../common/InputGroup';
import socket from '../../utils/socketConnection';


interface RegisterProps {
  loginHandler(x: boolean):void;
  isAuth: boolean;
}

const Register:FC<RegisterProps> = ({ loginHandler, isAuth }) => {
  const history = useHistory();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  if(isAuth) {
    return <Redirect to='/' />
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setState(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/users/register',
        JSON.stringify(state),
      );

      socket.emit('someone connect');
      setStorage(res.data);
      loginHandler(true);
      history.push('/')
    } catch (err) {}
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
        <Link to='/login'>
          If you have account go to Login.
        </Link>
      </p>
    </section>
  )
}

export default Register;
