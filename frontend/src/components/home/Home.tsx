import React, { FC, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import socket from '../../utils/socketConnection';
import './Home.css';

import UserItem, { UserItemProps } from './UserItem';


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
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [users, setUsers] = useState<UserItemProps[]>([]);
 
  //                             always will scroll to bottom                       //
  useEffect(() => {   
    const objDiv = document.querySelector(".public-chat__comments");
    if(objDiv) {
      objDiv.scrollTo(0, objDiv.scrollHeight);
    }
  });

  // get all users from BE
  useEffect(() => {
    let isSubscribed = true;
    const getUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/users');
        isSubscribed && setUsers(res.data as UserItemProps[]);
      } catch (err) {}
    }
    getUsers();

    return () => {
      isSubscribed = false;
    }
  }, []);

  
  // useeffect for all sockets subscriptions
  useEffect(() => {
    // if user is already logged in or registered and refresh page, will continue be online
    if(localStorage.getItem('uname')) {
      socket.emit('hi');
      socket.emit('someone connect');
    }

    // we create separate listener functions, because we want cleanup after leave page !!!!
    // notify other people that you are joined.
    const joinedUserListener = (username: string) => {
      setMessages(prev => [...prev, { text: `${username} is joined!`}]);
    }
    socket.on('hi', joinedUserListener);

    // get count of online users
    const onlineUsersListener = (users: number) => {
      setOnlineUsers(users);
    }
    socket.on('online users', onlineUsersListener);
  
    // send message to other, who are joined.
    const publicMsgListener = (msg: IMsg) => {
      setMessages(prev => [...prev, { userName: msg.userName, text: msg.text}])
    }
    socket.on('public msg', publicMsgListener);

    const userLeftListener = (username: string) => {
      setMessages(prev => [...prev, { text: `${username} left!`}]);
    }
    socket.on('someone left', userLeftListener);
    
    // remove subscrioptions when left home page.
    return () => {
      socket.off('hi', joinedUserListener);
      socket.off('online users', onlineUsersListener);
      socket.off('public msg', publicMsgListener);
      socket.off('someone left', userLeftListener);
    }
  }, []);
  
  if(!isAuth) {
    return <Redirect to='/login' />
  }

  const publicComment = () => {
    socket.emit('public msg', fullMsg); // send full message 
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
        <p>Online Users: {onlineUsers}</p>
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

        <aside className="users">
          {users.map(user => {
            return <UserItem name={user.name} _id={user._id} key={user._id} />
          })}
        </aside>
      </main>
    </>
  )
}

export default Home;
