import React, { FC, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import { FormWrapper, Button, CustomLink } from './Form.styles';

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
      socket.emit('hi');
      setStorage(res.data);
      loginHandler(true);
      history.push('/')
    } catch (err) {}
  }

  return (
    <FormWrapper registerStyles>
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
      <Button onClick={submitHandler}>Register</Button>
      <CustomLink to='/login'>
        if you have account go to Login.
      </CustomLink>
    </FormWrapper>
  )
}

export default Register;
