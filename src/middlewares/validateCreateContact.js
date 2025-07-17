import createError from 'http-errors';

export const validateCreateContact = (req, res, next) => {
  const { name, phoneNumber, contactType } = req.body;

  if (!name) {
    return next(createError(400, 'Missing required field: name'));
  }
  if (!phoneNumber) {
    return next(createError(400, 'Missing required field: phoneNumber'));
  }
  if (!contactType) {
    return next(createError(400, 'Missing required field: contactType'));
  }

  next();
};