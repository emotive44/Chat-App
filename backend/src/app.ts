import express, { Application, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import createSocket from './sockets';

import userRoutes from './routes/user-routes';
import HttpError from './models/httpErr-model';

config();
const port: number = 5000;
const app: Application = express();

// create http server
const server: Server = new Server(app);

// create connection with socket.io
createSocket(server);

// start server on port 5000;
server.listen(5000);

app.use(bodyParser.json());

// express middleware for implement CORS
app.use((_, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, x-auth-token, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

// express middlewares for routes
app.use('/api/v1/users/', userRoutes);

// express middlewares for Errors
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new HttpError(`Could not found ${req.url} route on this server.`, 404));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@chat.w1irz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`Running on port ${port}`);
  })
  .catch((err) => {
    console.error(err);
  });
