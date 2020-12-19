/* eslint-disable prettier/prettier */
import { Server, Socket } from 'socket.io';
import { Server as httpServer } from 'http';
import { ObjectId } from 'mongoose';

import { userStatus } from './controllers/user-controllers';

interface IUser {
  username: string;
  uid: ObjectId;
}

interface IMsg {
  username: string;
  text: string;
}

interface IConnectedUsers {
  name: string;
  userId: ObjectId;
  socketId: string;
}

// when somebody left, remove him from array with online users!!!
const reduceOnlineUsers = (socketId: string) => {
  connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
};

let connectedUsers: IConnectedUsers[] = [];
export default (server: httpServer): void => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', async (socket: Socket) => {
    const { username, uid } = socket.handshake.query as IUser;

    const ids = await io.allSockets(); // get all socket in namespace
    const onlineUsers = Array.from(ids).length;

    socket.on('hi', () => {
      socket.broadcast.emit('hi', username);
    });

    socket.on('someone connect', async (userData) => {
      connectedUsers.push({
        ...userData,
        socketId: socket.id,
      });
      await userStatus(uid, 'connect');
      io.emit('online users', onlineUsers);
    });

    // fire when user close tab or browser and notify who is left
    socket.on('disconnect', async () => {
      await userStatus(uid, 'disconnect');
      io.emit('online users', onlineUsers - 1);
      socket.broadcast.emit('someone left', username);

      reduceOnlineUsers(socket.id);
    });

    socket.on('logout', async () => {
      await userStatus(uid, 'disconnect');
      io.emit('online users', onlineUsers - 1);
      socket.broadcast.emit('someone left', username);

      reduceOnlineUsers(socket.id);
    });

    socket.on('public msg', (msg: IMsg) => {
      io.emit('public msg', msg);
    });

    socket.on(
      'private msg',
      (receiverId: ObjectId, senderId: ObjectId, msg: string, flag: boolean) => {
        // find reciever and sender without mutate connectedUsers [....]
        const reciever = [...connectedUsers].filter((user) => user.userId === receiverId);
        const sender = [...connectedUsers].filter((user) => user.userId === senderId);

        const senderName = sender[0] && sender[0].name;
        const receiverSocketId = reciever[0] && reciever[0].socketId;

        // chek if flag is false :
        // sender send to receiver
        // else receiver send message to previous sender
        if (!flag) {
          socket.to(receiverSocketId).emit('private msg', senderName, senderId, msg, receiverId);
        } else {
          socket.to(receiverSocketId).emit('private msg', senderName, receiverId, msg, senderId);
        }
      }
    );
  });
};
