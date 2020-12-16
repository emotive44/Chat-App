import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  query: {
    username: localStorage.getItem('uname') && localStorage.getItem('uname'),
    uid: localStorage.getItem('uid') && localStorage.getItem('uid'),
  }
}); 

export default socket;