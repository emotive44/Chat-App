import { Server, Socket } from 'socket.io';
import { Server as httpServer } from 'http';

interface IUser {
  username: string;
}

interface IMsg {
  username: string;
  text: string;
}

export default (server: httpServer): void => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', async (socket: Socket) => {
    const { username } = socket.handshake.query as IUser;

    const ids = await io.allSockets(); // get all socket in namespace
    const onlineUsers = Array.from(ids).length;

    socket.on('hi', () => {
      socket.broadcast.emit('hi', username);
    });

    socket.on('someone connect', () => {
      io.emit('online users', onlineUsers);
    });

    // fire when user close tab or browser and notify who is left
    socket.on('disconnect', () => {
      io.emit('online users', onlineUsers - 1);
      socket.broadcast.emit('someone left', username);
    });

    socket.on('logout', () => {
      io.emit('online users', onlineUsers - 1);
      socket.broadcast.emit('someone left', username);
    });

    socket.on('public msg', (msg: IMsg) => {
      io.emit('public msg', msg);
    });
  });
};
