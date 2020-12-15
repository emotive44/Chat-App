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

  io.on('connection', (socket: Socket) => {
    const { username } = socket.handshake.query as IUser;

    socket.broadcast.emit('hi', username);

    socket.on('msg', (msg: IMsg) => {
      io.emit('msg', msg);
    });
  });
};
