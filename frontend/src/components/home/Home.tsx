import React, { FC, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';


interface HomeProps {
  isAuth: boolean;
}

const Home: FC<HomeProps> = ({ isAuth }) => {
  const [messages, setMessages] = useState(['one', 'two', 'three']);
  const [msg, setMsg] = useState('');

  //                             always will scroll to bottom                       //
  useEffect(() => {   
    const objDiv = document.querySelector(".public-chat__comments");
    if(objDiv) {
      objDiv.scrollTo(0, objDiv.scrollHeight);
    }
  });
  
  if(!isAuth) {
    return <Redirect to='/login' />
  }

  const publicComment = () => {
    setMessages(prev => [...prev, msg]);
    setMsg('');
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
            <input type="text" value={msg} onChange={(e) => setMsg(e.currentTarget.value)} />
            <button onClick={publicComment}>Public Comment</button>
          </div>
          <div className="public-chat__comments">
            {messages.map((msg, i) => {
              return <p key={i}>{msg}</p>
            })}
          </div>
        </section>
      </main>
    </>
  )
}

export default Home;
