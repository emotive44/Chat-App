import express, { Application, Response } from 'express';

const port: number = 5000;
const app: Application = express();

app.get('/', (_, res: Response) => {
  res.status(200).send('hello');
});

app.listen(port, () => console.log(`Running on port ${port}`));
