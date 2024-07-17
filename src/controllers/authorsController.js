import controllerWrapper from '../decorators/controllerWrapper.js';
import HttpError from '../helpers/HttpError.js';
import * as authorsService from '../service/authorsService.js';

const getAllAuthors = async (req, res) => {
  const authors = await authorsService.getAllAuthors(req.user.id);

  res.status(200).json({ data: authors });
};

const getAuthor = async (req, res, next) => {
  const author = await authorsService.findAuthor({ _id: req.params.id });
  if (!author) return next(HttpError(404, 'Author not found'));

  res.status(200).json({ data: author });
};

const addAuthor = async (req, res, next) => {
  if (await authorsService.findAuthor({ name: req.body.name }))
    return next(HttpError(409, 'Author already exist'));

  const createdAuthor = await authorsService.addAuthor({
    ...req.body,
    owner: req.user.id,
  });

  res.status(201).json({ data: createdAuthor });
};

const addManyAuthors = async (req, res, next) => {
  const uniqueNames = [];

  const duplicatedNames = [];

  for (const name of req.body.names) {
    const author = await authorsService.findAuthor({
      name,
      owner: req.user.id,
    });
    if (!author) uniqueNames.push({ name, owner: req.user.id });
    else duplicatedNames.push(author);
  }

  const authors = await authorsService.addManyAuthors(uniqueNames);

  res.status(201).json({ data: [...duplicatedNames, ...authors] });
};

const updateAuthor = async (req, res, next) => {
  const updatedAuthor = await authorsService.updateAuthor(
    req.params.id,
    req.body
  );

  if (!updatedAuthor) return next(HttpError(404, 'Author not found'));

  res.status(201).json({ data: updatedAuthor });
};

const deleteAuthor = async (req, res, next) => {
  const deletedAuthor = await authorsService.deleteAuthor(req.params.id);
  if (!deletedAuthor) return next(HttpError(404, 'Author not found'));

  res.status(200).json({ data: deletedAuthor });
};

export default {
  getAllAuthors: controllerWrapper(getAllAuthors),
  getAuthor: controllerWrapper(getAuthor),
  addAuthor: controllerWrapper(addAuthor),
  addManyAuthors: controllerWrapper(addManyAuthors),
  updateAuthor: controllerWrapper(updateAuthor),
  deleteAuthor: controllerWrapper(deleteAuthor),
};
