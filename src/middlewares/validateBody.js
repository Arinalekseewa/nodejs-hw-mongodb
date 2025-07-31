import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const details = err.details?.map(({ message, path, type }) => ({
      message,
      path,
      type,
    }));

    const error = createHttpError(400, 'Validation Error', {
      errors: details,
    });

    next(error);
  }
};