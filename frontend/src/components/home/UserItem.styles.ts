import styled from 'styled-components';


export const User = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
`;

export const UserName = styled.span`
  width: 12rem;
  cursor: pointer;
`;

export const UserStatus = styled.small<{ isOnline: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  align-self: center;
  background: ${({ isOnline }) => isOnline ? 'green' : 'red'};
`;