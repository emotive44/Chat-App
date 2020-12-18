import React, { FC, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import socket from '../../utils/socketConnection';
import './Home.css';

import UserItem, { UserItemProps } from './UserItem';
import PrivateChat, { IPrivateMsg } from './PrivateChat';


interface IMsg {
  userName?: string;
  text: string;
}

interface ICurrUser {
  _id: string;
  name: string;
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
  const [currUsers, setCurrUsers] = useState<ICurrUser[]>([]);
  const [commingMsg, setCommingMsg] = useState<IPrivateMsg>({ text: '', sender: '' });
 
  // fetch all users from BE
  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/users');
      let fetchedUsers = res.data as UserItemProps[];
      fetchedUsers = fetchedUsers.map(user => {
        if(user._id === localStorage.getItem('uid')) {
          user.isOnline = true;
        }
        return user;
      });

      setUsers(fetchedUsers);
    } catch (err) {}
  }

  //                             always will scroll to bottom                       //
  useEffect(() => {   
    const objDiv = document.querySelector(".public-chat__comments");
    if(objDiv) {
      objDiv.scrollTo(0, objDiv.scrollHeight);
    }
  });

  // useeffect for all sockets subscriptions
  useEffect(() => {
    getUsers();

    // if user is already logged in or registered and refresh page, will continue be online
    if(localStorage.getItem('uname') && localStorage.getItem('uid') && currUsers.length === 0 && onlineUsers === 0) {
      let connectedUser = {                                             //make this cheks to stop re-renders
        userId: localStorage.getItem('uid'),
        name: localStorage.getItem('uname'),
      }
      
      socket.emit('hi');
      socket.emit('someone connect', connectedUser);
    }

    // send private message
    const privateMsgListener = (senderName: string, senderId: string, msg: string) => {
      setCommingMsg({ sender: senderName, text: msg });
      let isExist = currUsers.findIndex(user => user._id === senderId);
  
      if(isExist === -1) {
        setCurrUsers(prev => [...prev, { name: senderName, _id: senderId}]);
      }
    }
    socket.on('private msg', privateMsgListener);

    // we create separate listener functions, because we want cleanup after leave page !!!!
    // notify other people that you are joined.
    const joinedUserListener = (username: string) => {
      setMessages(prev => [...prev, { text: `${username} is joined!`}]);
    }
    socket.on('hi', joinedUserListener);

    // get count of online users
    const onlineUsersListener = (onlineUsers: number) => {
      getUsers(); // when somebody connected, make request to get users with new status
      setOnlineUsers(onlineUsers);
    }
    socket.on('online users', onlineUsersListener);
  
    // send message to other, who are joined.
    const publicMsgListener = (msg: IMsg) => {
      setMessages(prev => [...prev, { userName: msg.userName, text: msg.text}])
    }
    socket.on('public msg', publicMsgListener);

    const userLeftListener = (username: string) => {
      getUsers(); // when somebody disconnected, make request to get users with new status
      setMessages(prev => [...prev, { text: `${username} left!`}]);
    }
    socket.on('someone left', userLeftListener);
    
    // remove subscrioptions when left home page.
    return () => {
      socket.off('hi', joinedUserListener);
      socket.off('online users', onlineUsersListener);
      socket.off('public msg', publicMsgListener);
      socket.off('someone left', userLeftListener);
      socket.off('private msg', privateMsgListener);
    }
  }, [currUsers, onlineUsers]);
  
  if(!isAuth) {
    return <Redirect to='/login' />
  }

  const publicComment = () => {
    socket.emit('public msg', fullMsg); // send full message 
    setMsg('');
    setFullMsg({} as IMsg);
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

  // set all users with who write private messages
  const currentUsersHandler = (user: ICurrUser) => {
    // check if chat with current user is already open!!!!
    let isExist = false;
    currUsers.forEach(currUser => {
      if(currUser.name === user.name) {
        isExist = true;
      }
    });

    if(isExist) {
      return;
    }
    // if(currUsers.includes(user)) {
    //   return;
    // }
    setCurrUsers(prev => [...prev, user]);
  }

  const closePrivateChat = (id: string) => {
    const privateChatUsers = currUsers.filter(user => {
      if(user._id !== id) {
        return user;
      }
    });

    setCurrUsers(privateChatUsers);
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
            return (
              <UserItem 
                _id={user._id} 
                key={user._id} 
                name={user.name}
                isOnline={user.isOnline} 
                clickHandler={currentUsersHandler}
              />
            )
          })}
        </aside>
      </main>

      <div className="chats">
        {currUsers.map((user, i) => {
          if(i < 3) {
            return (
              <PrivateChat 
                commingMsg={commingMsg} 
                setCommingMsg={setCommingMsg} 
                userName={user.name} 
                clickHandler={closePrivateChat} 
                key={i} 
                _id={user._id} 
              />
            )
          } else return null;
        })}

        {currUsers.length > 3 && <div className="messages">More messages....</div>}
      </div>
    </>
  )
}

export default Home;
