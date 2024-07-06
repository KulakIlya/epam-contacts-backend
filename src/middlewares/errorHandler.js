const errorHandler = (err, _, res, _1) => {
  const { status = 500, message = 'Server error' } = err;

  res.status(status).json({ message });
};

export default errorHandler;
