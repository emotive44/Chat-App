import React, { FC } from 'react';
import './Message.css';

interface MessageProps {
  text: string;
  sender: string;
}

const Message: FC<MessageProps> = ({ text, sender }) => {
  const messageClasses = ['message'];
  if(sender === localStorage.getItem('uname')) {
    messageClasses.push('message--right');
  }

  return (
    <p className={messageClasses.join(' ')}>
      {text}
      <span className="message__sender">{sender}</span>
    </p>
  )
}

export default Message;
