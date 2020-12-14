import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: FC = () => {
  return (
    <header className="navbar">
      <ul>
        <li>
          <NavLink exact to='/login'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/register'>
            Register
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/'>
            Logout
          </NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Navbar;

