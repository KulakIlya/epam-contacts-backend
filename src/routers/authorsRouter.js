import express from 'express';

import authorsController from '../controllers/authorsController.js';
import validateId from '../helpers/validateId.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';
import { addAuthor, updateAuthor } from '../schemas/authorsSchema.js';

const authorsRouter = express.Router();

authorsRouter.get('/all', authenticate, authorsController.getAllAuthors);
authorsRouter.get(
  '/:id',
  authenticate,
  validateId,
  authorsController.getAuthor
);
authorsRouter.post(
  '/add',
  authenticate,
  validateBody(addAuthor),
  authorsController.addAuthor
);
authorsRouter.put(
  '/:id',
  authenticate,
  validateId,
  validateBody(updateAuthor),
  authorsController.updateAuthor
);
authorsRouter.delete(
  '/:id',
  authenticate,
  validateId,
  authorsController.deleteAuthor
);

export default authorsRouter;
