import express from 'express';

import usersControllers from '../controllers/usersControllers.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';
import { login, registration } from '../schemas/usersSchema.js';

const usersRouter = express.Router();

usersRouter.get('/me', authenticate, usersControllers.getMe);
usersRouter.post(
  '/register',
  validateBody(registration),
  usersControllers.registerUser
);
usersRouter.post('/login', validateBody(login), usersControllers.loginUser);
usersRouter.delete('/logout', authenticate, usersControllers.logoutUser);

export default usersRouter;
