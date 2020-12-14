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

  let existUser;
  try {
    existUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again.', 500));
  }

  if (existUser) {
    return next(
      new HttpError('User exist already, you can try with new data', 422)
    );
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    await newUser.save();
  } catch (err) {
    return new HttpError('Register failed, please try again.', 500);
  }

  res.status(201).json({
    userId: newUser.id,
    name: newUser.name,
  });
};

export { register };
