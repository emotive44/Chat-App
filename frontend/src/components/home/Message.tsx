import React, { FC } from 'react';
// import './Message.css';

import { MessageContainer, MessageSender } from './Message.styles'

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
    <MessageContainer isMe={sender === localStorage.getItem('uname') ? true : false} >
      {text}
      <MessageSender>{sender}</MessageSender>
    </MessageContainer>
  )
}

export default Message;
