import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

import InputGroup from '../common/InputGroup';

const Register:FC = () => {
  return (
    <section className="form-wrapper" style={{ height: '29rem' }}>
      <InputGroup label='Name' type='text' />
      <InputGroup label='Email' type='text' />
      <InputGroup label='Password' type='password' />
      <button>Register</button>
      <p>
        <Link to='/register'>
          If you have account go to Login.
        </Link>
      </p>
    </section>
  )
}

export default Register;
