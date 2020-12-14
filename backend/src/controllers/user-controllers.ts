import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user-model';

import HttpError from '../models/httpErr-model';

type TResponse = void | HttpError;

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<TResponse> => {
  const { name, email, password } = req.body as IUser;

  console.log(name, email, password);
};

export { register };
