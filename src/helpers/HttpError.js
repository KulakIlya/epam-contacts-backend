const ERROR_MESSAGES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

const HttpError = (status, message = ERROR_MESSAGES[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
