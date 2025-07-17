export const errorHandler = (err, req, res) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Something went wrong',
    error: err.message,
  });
};
