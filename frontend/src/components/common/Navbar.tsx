import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { NavbarContainer, Li, ActiveNavLink } from './Navbar.styles';

import socket from '../../utils/socketConnection';


interface NavbarProps {
  isAuth: boolean;
  logoutHandler(): void;
}

const Navbar: FC<NavbarProps> = ({ logoutHandler, isAuth }) => {
  const logout = () => {
    socket.emit('logout');
    localStorage.clear();
    logoutHandler();
  }

  const userName = localStorage.getItem('uname');

  return (
    // <header>
      <NavbarContainer isAuth={isAuth}>
        {!isAuth && (
          <>
            <Li><ActiveNavLink exact to='/login'>Login</ActiveNavLink></Li>
            <Li><ActiveNavLink exact to='/register'>Register</ActiveNavLink></Li>
          </>
        )}

        {isAuth && (
          <>
            <Li><ActiveNavLink exact to='/' >Home</ActiveNavLink></Li>
            <Li><Link to='/' onClick={logout}>Logout</Link></Li>
            <Li isLast>Hello, {userName}!</Li>
          </>
        )}
      </NavbarContainer>
    // </header>
  )
}

export default Navbar;

