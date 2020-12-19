import React, { FC, useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import socket from '../../utils/socketConnection';
import './Home.css';

import UserItem, { UserItemProps } from './UserItem';
import PrivateChat from './PrivateChat';


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

export interface IPrivateMsg {
  text: string;
  sender: string;
}

export interface IPrivateChat { 
  receiver: string;
  sender: string;
  msgs: IPrivateMsg[];
  userName: string;
}

const Home: FC<HomeProps> = ({ isAuth }) => {
  const [messages, setMessages] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState('');
  const [fullMsg, setFullMsg] = useState<IMsg>();
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [users, setUsers] = useState<UserItemProps[]>([]);
  const [privateChats, setPrivateChats] = useState<IPrivateChat[]>([]);

  const myId = localStorage.getItem('uid') || '';
  const myName = localStorage.getItem('uname') || '';

  // fetch all users from BE
  // useCallback return a memoized version of the callback that only changes if myId dependency has changed.
  const getUsers = useCallback(
    async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/users');
        let fetchedUsers = res.data as UserItemProps[];
        fetchedUsers = fetchedUsers.map(user => {  
          if(user._id === myId) {
            user.isOnline = true;  // here set current user manualy online
          }
          return user;
        });

        setUsers(fetchedUsers);
      } catch (err) {}
    },
    [myId]
  );

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
    if(myId && myName && privateChats.length === 0 && onlineUsers === 0) { //make this cheks to stop re-renders
      let connectedUser = {
        userId: myId,
        name: myName,
      }
      
      socket.emit('hi');
      socket.emit('someone connect', connectedUser);
    }

    // send private message
    const privateMsgListener = (senderName: string, senderId: string, msg: string, receiverId: string) => {
      const isExist = privateChats.findIndex(chat => chat.receiver === receiverId && chat.sender === senderId);
      
      // chek if the current chat is already exist, and if is not, we created it
      if(isExist === -1) {
        const privateChat = {} as IPrivateChat;
        privateChat.receiver = receiverId;

        if(privateChat.msgs === undefined) {
          privateChat.msgs = [{ sender: senderName, text: msg }]
        }
        privateChat.userName = senderName;
        privateChat.sender = senderId;

        setPrivateChats(prev => [...prev, privateChat])
      } else {
        // if is already exist, we found it and put new messages inside
        const chats = privateChats.map(chat => {
          if(chat.receiver === receiverId && chat.sender === senderId) {
            chat.msgs = [...chat.msgs, { sender: senderName, text: msg }]
          }
          return chat;
        })

        setPrivateChats(chats);
      }
    
      // ///////////////////////////////////////
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
  }, [onlineUsers, privateChats, getUsers, myName, myId]);
  
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
    privateChats.forEach(chat => {
      // chek when somebody is send message to you. You can not open the second chat with him
      if(chat.receiver === user._id || chat.receiver === myId) {
        isExist = true;
      }
    });

    if(isExist) {
      return;
    }

    setPrivateChats(prev => [...prev, {receiver: user._id, sender: myId,  msgs: [], userName: user.name }])
  }

  const closePrivateChat = (id: string) => {
    const reducedPrivateChats = privateChats.filter(chat => chat.receiver !== id);
    setPrivateChats(reducedPrivateChats);
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
        {privateChats.map((chat, i) => {
          if(i < 3) {
            return (
              <PrivateChat 
                key={i}
                msgs={chat.msgs}
                chats={privateChats}
                userId={chat.receiver}
                userName={chat.userName}
                commingPrChats={setPrivateChats}
                closePrivateChat={closePrivateChat}
              />
            );
          } else {
            return null;
          }
        })}

        {privateChats.length > 3 && <div className="messages">More messages....</div>}
      </div>
    </>
  )
}

export default Home;
