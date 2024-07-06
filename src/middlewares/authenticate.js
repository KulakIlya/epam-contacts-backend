import jwt from 'jsonwebtoken';

import HttpError from '../helpers/HttpError.js';
import * as usersService from '../service/usersService.js';

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async (req, _, next) => {
  if (!req.headers.authorization) return next(HttpError(403));

  const [bearer, token] = req.headers.authorization.split(' ');
  if (bearer !== 'Bearer') return next(HttpError(403));

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await usersService.findUser({ _id: id });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    next(HttpError(401));
  }
};

export default authenticate;
