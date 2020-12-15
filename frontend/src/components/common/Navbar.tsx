import React, { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
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

  const ulStyles = isAuth ? {'width': '32rem'} : {};
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
            <li><NavLink exact to='/' >Home</NavLink></li>
            <li><Link to='/' onClick={logout}>Logout</Link></li>
            <li style={{ cursor: 'default', fontWeight: 'bold' }} >Hello, {userName}!</li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Navbar;

