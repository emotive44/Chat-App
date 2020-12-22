import styled, { css } from 'styled-components';


const RightMsgStyles = css`
  margin-left: auto;
  text-align: end;
`;

export const MessageContainer = styled.p<{ isMe: boolean }>`
  margin-top: 0.5rem;
  display: flex;
  ${({ isMe }) => isMe && RightMsgStyles}
`;

export const MessageSender = styled.span`
  font-size: 0.8rem;
  font-style: italic;
  margin-top: 0.4rem;
  margin-left: 0.3rem;
  align-self: flex-end;
`;