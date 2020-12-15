import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  isAuth: boolean;
  logoutHandler(): void;
}

const Navbar: FC<NavbarProps> = ({ logoutHandler, isAuth }) => {
  const logout = () => {
    localStorage.clear();
    logoutHandler();
  }

  const ulStyles = isAuth ? {'width': '27rem'} : {};
  const userName = localStorage.getItem('uname');

  return (
    <header className="navbar">
      <ul style={ulStyles}>
        {!isAuth && (
          <>
            <li><NavLink exact to='/login'>Login</NavLink></li>
            <li><NavLink exact to='/register'>Register</NavLink></li>
          </>
        )}

        {isAuth && (
          <>
            <li>Hello, {userName}!</li>
            <li><NavLink exact to='/' onClick={logout}>Logout</NavLink></li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Navbar;

