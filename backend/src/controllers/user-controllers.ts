import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user-model';
import { ObjectId } from 'mongoose';

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
    isOnline: true,
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
    userId: existUser._id,
    name: existUser.name,
  });
};

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<TResponse> => {
  let users: IUser[];
  try {
    users = await User.find().select('_id name isOnline');
  } catch (err) {
    return next(new HttpError('Fetching users failed, please try again.', 500));
  }

  if (users.length < 1) {
    return next(
      new HttpError(
        'Sorry, user with this name was not found, please try with other name.',
        404
      )
    );
  }

  res.status(200).json(users);
};

const userStatus = async (userId: ObjectId, status: string): Promise<void> => {
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.error(err);
  }

  if (user) {
    status === 'connect' ? (user.isOnline = true) : (user.isOnline = false);

    try {
      await user.save();
    } catch (err) {
      console.error(err);
    }
  }
};

export { register, login, getAllUsers, userStatus };
