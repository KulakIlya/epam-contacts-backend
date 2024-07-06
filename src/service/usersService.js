import User from './models/user.js';

export const findUser = (filter) => User.findOne(filter);

export const registerUser = (userData) => User.create(userData);

export const loginUser = (id, token) =>
  User.findByIdAndUpdate(id, { token }, { new: true });

export const logoutUser = (id) => User.findByIdAndUpdate(id, { token: '' });
