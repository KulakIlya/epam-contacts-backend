import Author from './models/author.js';

export const findAuthor = (filter) => Author.findOne(filter);

export const getAllAuthors = (id) => Author.find({ owner: id });

export const addAuthor = (authorData) => Author.create(authorData);

export const updateAuthor = (id, authorData) =>
  Author.findByIdAndUpdate(id, authorData, { new: true });

export const deleteAuthor = (id) => Author.findByIdAndDelete(id);
