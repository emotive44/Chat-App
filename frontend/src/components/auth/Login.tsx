import React, { FC, useState } from 'react'
import { Redirect, useHistory } from "react-router-dom";
import './Form.css';

import axios from 'axios';
import InputGroup from '../common/InputGroup';
import setStorage from '../../utils/setStorage';
import socket from '../../utils/socketConnection';

interface LoginProps {
  loginHandler(x: boolean):void;
  isAuth: boolean;
}

const Login: FC<LoginProps> = ({ loginHandler, isAuth }) => {
  const history = useHistory();
  const [state, setState] = useState({
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
        'http://localhost:5000/api/v1/users/login',
        JSON.stringify(state),
      );

      socket.emit('someone connect');
      socket.emit('hi');
      setStorage(res.data);  
      loginHandler(true);
      history.push('/');
    } catch (err) {}
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
