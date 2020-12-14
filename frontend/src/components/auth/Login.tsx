import React, { FC } from 'react'
import './Form.css';

import InputGroup from '../common/InputGroup';

const Login: FC = () => {
  return (
    <section className="form-wrapper">
      <InputGroup label='Email' type='text' />
      <InputGroup label='Password' type='password' />
      <button>Login</button>
    </section>
  )
}

export default Login;
