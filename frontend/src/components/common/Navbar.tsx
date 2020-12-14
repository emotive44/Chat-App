import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: FC = () => {
  return (
    <header className="navbar">
      <ul>
        <li>
          <Link to='/login'>
            Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            Register
          </Link>
        </li>
        <li>
          <Link to='/'>
            Logout
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Navbar;

