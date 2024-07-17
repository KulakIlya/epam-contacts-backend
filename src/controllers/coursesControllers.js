import controllerWrapper from '../decorators/controllerWrapper.js';
import HttpError from '../helpers/HttpError.js';
import * as coursesService from '../service/coursesService.js';

const getAllCourses = async (req, res) => {
  const { id } = req.user;

  const courses = await coursesService.getAllCourses(id);

  res.status(200).json({ data: courses });
};

const addCourse = async (req, res, next) => {
  if (await coursesService.findCourse({ title: req.body.title }))
    return next(HttpError(409, 'Course already exists'));

  const course = await coursesService.addCourse({
    ...req.body,
    owner: req.user.id,
  });

  res.status(201).json({ data: course });
};

const getCourse = async (req, res, next) => {
  const course = await coursesService.findCourse({ _id: req.params.id });

  if (!course) return next(HttpError(404, 'No course found'));

  res.status(200).json({ data: course });
};

const updateCourse = async (req, res, next) => {
  const updatedCourse = await coursesService.updateCourse(
    req.params.id,
    req.body
  );

  if (!updateCourse) return next(HttpError(404, 'No course found'));

  res.status(201).json({ data: updatedCourse });
};

const deleteCourse = async (req, res, next) => {
  const deletedCourse = await coursesService.deleteCourse(req.params.id);

  if (!deletedCourse) return next(HttpError(404, 'No course found'));

  res.status(200).json({ data: deletedCourse });
};

export default {
  getAllCourses: controllerWrapper(getAllCourses),
  addCourse: controllerWrapper(addCourse),
  getCourse: controllerWrapper(getCourse),
  updateCourse: controllerWrapper(updateCourse),
  deleteCourse: controllerWrapper(deleteCourse),
};
