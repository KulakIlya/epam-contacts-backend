import mongoose from 'mongoose';
import HttpError from './HttpError.js';

const validateId = (req, _, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return next(HttpError(400, 'Id is not valid'));

  next();
};

export default validateId;
