import Course from '../service/models/course.js';

export const findCourse = (filter) => Course.findOne(filter);

export const getAllCourses = (id) => Course.find({ owner: id });

export const addCourse = (courseData) => Course.create(courseData);

export const updateCourse = (id, courseData) =>
  Course.findByIdAndUpdate(id, courseData, { new: true });

export const deleteCourse = (id) => Course.findByIdAndDelete(id);
