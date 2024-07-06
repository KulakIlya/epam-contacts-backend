import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import controllerWrapper from '../decorators/controllerWrapper.js';
import HttpError from '../helpers/HttpError.js';
import * as usersService from '../service/usersService.js';

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (req, res, next) => {
  if (await usersService.findUser({ email: req.body.email }))
    return next(HttpError(409, 'User already exist'));

  const SALT = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, SALT);

  await usersService.registerUser({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json();
};

const loginUser = async (req, res, next) => {
  const user = await usersService.findUser({ email: req.body.email });

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!user || !isPasswordCorrect)
    return next(HttpError(401, 'Email or password is invalid'));

  const response = { name: user.name, email: user.email };

  const token = jwt.sign({ ...response, id: user.id }, SECRET_KEY, {
    expiresIn: '10h',
  });

  await usersService.loginUser(user.id, token);

  res.status(200).json({ ...response, token });
};

const logoutUser = async (req, res) => {
  await usersService.logoutUser(req.user.id);
  res.status(204).json();
};

const getMe = async (req, res) =>
  res.status(200).json({ name: req.user.name, email: req.user.email });

export default {
  registerUser: controllerWrapper(registerUser),
  loginUser: controllerWrapper(loginUser),
  logoutUser: controllerWrapper(logoutUser),
  getMe: controllerWrapper(getMe),
};
