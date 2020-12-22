import styled from 'styled-components';

export const UsersOnline = styled.p`
  width: 15rem;
  margin-left: auto;
`;

export const MainHome = styled.main`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
`;

export const PublicChatSection = styled.section`
  width: 40%;
  height: 17rem;
  margin-left: 15rem;
  border: 1px solid black;
`;

export const PublicChatTitle = styled.p`
  width: 50%;
  margin: 0 auto;
  text-align: center;
`;

export const PublicChatForm = styled.div`
  width: 95%;
  display: flex;
  margin: 1rem auto;
  justify-content: space-between;
`;

export const PublicChatComments = styled.div`
  height: 10rem;
  overflow-y: auto;
  margin-left: 0.5rem;
`;

export const MsgCreator = styled.span`
  font-weight: 500;
  font-style: italic;
`;

export const UsersContainer = styled.aside`
  height: 84vh;
  width: 19rem;
  margin-right: 1rem;
  border: 1px solid black;
`;

export const ChatsContainer = styled.div`
  width: 80%;
  bottom: 0rem;
  right: 21rem;
  height: 35rem;
  display: flex;
  position: fixed;
  margin-bottom: 0.5rem;
  flex-direction: row-reverse;
`;

export const MoreMsgs = styled.div`
  width: 13rem;
  height: 3rem;
  display: flex;
  align-items: center;
  align-self: flex-end;
  border: 1px solid black;
`;