import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import './PrivateChat.css';

import Message from './Message';
import socket from '../../utils/socketConnection';

import { IPrivateChat, IPrivateMsg } from './Home';


interface PrivateChatProps {
  userId: string;
  userName: string;
  msgs: IPrivateMsg[]
  chats: IPrivateChat[];
  commingPrChats: Dispatch<SetStateAction<IPrivateChat[]>>;
  closePrivateChat(id: string): void;
}

const PrivateChat: FC<PrivateChatProps> = ({ chats, commingPrChats, msgs, userName, closePrivateChat, userId }) => {
  const [msg, setMsg] = useState('');
  const myId = localStorage.getItem('uid') || '';
  const myName = localStorage.getItem('uname') || '';

  const createAvatar = (): string => {
    const curName = userName.split(' ');
    
    if(curName.length > 1) {
      return curName[0][0] + curName[1][0];
    } else {
      return curName[0][0];
    }
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.currentTarget.value);
  }

  const sendPrivateMsg = () => {
    // if message is '', don't send empty message and exit of function
    if(!msg) {
      return;
    }

    setMsg('');

    let currChat;
    // check if receiver is the current user, we change receiver to chat.sender 
    // else we send message to current receiver
    if(userId === myId) {
      let receiver;
      currChat = chats.map((chat: any) => {
        if(chat.receiver === userId && chat.sender !== myId && chat.userName === userName) {
          receiver = chat.sender;
          chat.msgs.push({ text: msg, sender: myName })
        }
        return chat;
      });
      // if we receiver send message, we send flag = true
      socket.emit('private msg', receiver, myId, msg, true);
    } else {
      currChat = chats.map((chat: any) => {
        if(chat.receiver === userId && chat.sender === myId) {
          chat.msgs.push({ text: msg, sender: myName })
        }
        return chat;
      });
      socket.emit('private msg', userId, myId, msg);
    }
  
    commingPrChats(currChat);
  }

  return (
    <article className="chat">
      <header className="chat__header">
        <div>
          <span className="chat__avatar">{createAvatar()}</span>
          <span>{userName}</span>
        </div>
        <button className="chat__close" onClick={() => closePrivateChat(userId)}>X</button>
      </header>
      <div className="chat__main">
        {msgs.map((msg, i) => {
          return <Message text={msg.text} sender={msg.sender} key={i} />
        })}
      </div>
      <footer className="chat__footer">
        <input type="text" name="private-msg" value={msg} onChange={changeHandler} />
        <button onClick={sendPrivateMsg}>Send</button>
      </footer>
    </article>
  )
}

export default PrivateChat;
