import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import './Login.css';

const Login: FC = () => {
  return (
    <section className="login">
      <div>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="email">Your Email</label>
        <input type="text" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Your Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button>Register</button>
      <p>
        <Link to='/register'>
          If you have account go to Login.
        </Link>
      </p>
    </section>
  )
}

export default Login;
