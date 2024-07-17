import express from 'express';

import coursesControllers from '../controllers/coursesControllers.js';
import validateId from '../helpers/validateId.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';
import { addCourse, updateCourse } from '../schemas/coursesSchema.js';

const coursesRouter = express.Router();

coursesRouter.get('/all', authenticate, coursesControllers.getAllCourses);
coursesRouter.post(
  '/add',
  authenticate,
  validateBody(addCourse),
  coursesControllers.addCourse
);
coursesRouter.get(
  '/:id',
  authenticate,
  validateId,
  coursesControllers.getCourse
);
coursesRouter.patch(
  '/:id',
  authenticate,
  validateId,
  validateBody(updateCourse),
  coursesControllers.updateCourse
);
coursesRouter.delete(
  '/:id',
  authenticate,
  validateId,
  coursesControllers.deleteCourse
);

export default coursesRouter;
