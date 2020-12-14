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

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<TResponse> => {
  const { email, password } = req.body as IUser;

  let existUser: IUser | null;
  try {
    existUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Login failed, please try again.', 500));
  }

  if (!existUser) {
    return next(new HttpError('Invalid email or password, login failed.', 401));
  }

  let isValidPass = false;
  try {
    isValidPass = await existUser.comparePassword(password);
  } catch (err) {
    return next(new HttpError('Login failed, please try again.', 500));
  }

  if (!isValidPass) {
    return next(new HttpError('Invalid email or password, login failed.', 401));
  }

  res.status(200).json({
    userId: existUser.id,
    name: existUser.name,
  });
};

export { register, login };
