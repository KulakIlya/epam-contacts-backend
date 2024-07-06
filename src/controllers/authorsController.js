import controllerWrapper from '../decorators/controllerWrapper.js';
import HttpError from '../helpers/HttpError.js';
import * as authorsService from '../service/authorsService.js';

const getAllAuthors = async (req, res) => {
  const authors = await authorsService.getAllAuthors(req.user.id);

  res.status(200).json(authors);
};

const getAuthor = async (req, res, next) => {
  const author = await authorsService.findAuthor({ _id: req.params.id });
  if (!author) return next(HttpError(404, 'Author not found'));

  res.status(200).json(author);
};

const addAuthor = async (req, res, next) => {
  if (await authorsService.findAuthor({ name: req.body.name }))
    return next(HttpError(409, 'Author already exist'));

  const createdAuthor = await authorsService.addAuthor({
    ...req.body,
    owner: req.user.id,
  });

  res.status(201).json(createdAuthor);
};

const updateAuthor = async (req, res, next) => {
  const updatedAuthor = await authorsService.updateAuthor(
    req.params.id,
    req.body
  );

  if (!updatedAuthor) return next(HttpError(404, 'Author not found'));

  res.status(201).json(updatedAuthor);
};

const deleteAuthor = async (req, res, next) => {
  const deletedAuthor = await authorsService.deleteAuthor(req.params.id);
  if (!deletedAuthor) return next(HttpError(404, 'Author not found'));

  res.status(200).json(deletedAuthor);
};

export default {
  getAllAuthors: controllerWrapper(getAllAuthors),
  getAuthor: controllerWrapper(getAuthor),
  addAuthor: controllerWrapper(addAuthor),
  updateAuthor: controllerWrapper(updateAuthor),
  deleteAuthor: controllerWrapper(deleteAuthor),
};
