import React, { FC, useState } from 'react'
import { Redirect, useHistory } from "react-router-dom";

import { FormWrapper, Button } from './Form.styles';

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
      console.log(res.data)
      socket.emit('someone connect', res.data);
      socket.emit('hi');
      setStorage(res.data);  
      loginHandler(true);
      history.push('/');
    } catch (err) {}
  }

  return (
    <FormWrapper>
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
      <Button onClick={submitHandler}>Login</Button>
    </FormWrapper>
  )
}

export default Login;
