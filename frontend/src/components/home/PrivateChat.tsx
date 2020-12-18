import React, { FC, useState, useEffect } from 'react';
import './PrivateChat.css';

import Message from './Message';
import socket from '../../utils/socketConnection';


interface PrivateChatProps {
  _id: string;
  userName: string;
  clickHandler: Function;
  commingMsg: IPrivateMsg;
  setCommingMsg: Function
}

export interface IPrivateMsg { 
  text: string;
  sender: string;
}

const PrivateChat: FC<PrivateChatProps> = ({ userName, clickHandler, _id, commingMsg, setCommingMsg }) => {
  const [msg, setMsg] = useState('');
  const [privateMsgs, setPrivateMsgs] = useState<IPrivateMsg[]>([])
  const myId = localStorage.getItem('uid') || '';

  useEffect(() => {
    setPrivateMsgs(prev => [...prev, commingMsg]);
    setCommingMsg('');
  }, [commingMsg, setCommingMsg]);

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
    if(!msg) {
      return;
    }

    setPrivateMsgs(prev => [
      ...prev,
      { text: msg, sender: localStorage.getItem('uname') || '' }
    ]);

    setMsg('');
    socket.emit('private msg', _id, myId, msg);
  }

  return (
    <article className="chat">
      <header className="chat__header">
        <div>
          <span className="chat__avatar">{createAvatar()}</span>
          <span>{userName}</span>
        </div>
        <button className="chat__close" onClick={() => clickHandler(_id)}>X</button>
      </header>
      <div className="chat__main">
        {privateMsgs.map((msg, i) => {
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
