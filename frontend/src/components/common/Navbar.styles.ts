import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';


export const NavbarContainer = styled.ul<{ isAuth: boolean }>`
  width: ${({ isAuth }) => isAuth ? '32rem' : '19rem' };
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid black;
  padding-bottom: 0.5rem;
`;

const LastLiStyles = css`
  cursor: default; 
  font-weight: bold;
`;

export const Li = styled.li<{ isLast?: boolean }>`
  margin-right: 1rem;
  cursor: pointer;
  ${({ isLast }) => isLast && LastLiStyles}
`;

export const ActiveNavLink = styled(NavLink)`
  &.active {
    padding-bottom: 0.4rem;
    border-bottom: 4px solid black;
  }
`;