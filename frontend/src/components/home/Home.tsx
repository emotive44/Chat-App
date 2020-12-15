import React, { FC, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import socket from '../../utils/socketConnection';
import './Home.css';


interface IMsg {
  userName?: string;
  text: string;
}

interface HomeProps {
  isAuth: boolean;
}

const Home: FC<HomeProps> = ({ isAuth }) => {
  const [messages, setMessages] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState('');
  const [fullMsg, setFullMsg] = useState<IMsg>();
  
  //                             always will scroll to bottom                       //
  useEffect(() => {   
    const objDiv = document.querySelector(".public-chat__comments");
    if(objDiv) {
      objDiv.scrollTo(0, objDiv.scrollHeight);
    }
  });

  
  useEffect(() => {
    // notify other people that you are joined.
    socket.on('hi', (msg: string) => {
      setMessages(prev => [...prev, { text: `${msg} is joined!`}])
    });
  
    // send message to other, who are joined.
    socket.on('msg', (msg: IMsg) => {
      setMessages(prev => [...prev, { userName: msg.userName, text: msg.text}])
    });
    
    // remove subscrioptions when left home page.
    return () => {
      socket.off('msg');
      socket.off('hi');
    }
  }, []);
  
  if(!isAuth) {
    return <Redirect to='/login' />
  }

  const publicComment = () => {
    socket.emit('msg', fullMsg); // send full message 
    setMsg('');
  } 

  // create full message
  const msgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userName = localStorage.getItem('uname');
    const text = e.currentTarget.value;

    setMsg(text);

    if(userName !== null && text !== null) {
      setFullMsg({ userName, text });
    }
  }
 
  return (
    <>
      <div className="online-users">
        <p>Online Users: 123</p>
      </div>

      <main>
        <section className='public-chat'>
          <p className="public-chat__title">Public Chat For All Users</p>
          <div className="public-chat__form">
            <input type="text" value={msg} onChange={msgHandler} />
            <button onClick={publicComment}>Public Comment</button>
          </div>
          <div className="public-chat__comments">
            {messages.map((msg, i) => {
              return <p key={i}>
                {msg.userName && <span className='bold'>{msg.userName}: </span>}
                {' '}
                <span>{msg.text}</span>
              </p>
            })}
          </div>
        </section>
      </main>
    </>
  )
}

export default Home;
