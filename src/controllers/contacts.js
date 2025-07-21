import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContactById
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

	const {
    data,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  } = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  if (totalPages > 0 && page > totalPages) {
    return res.status(404).json({
      status: 404,
      message: `Сторінка ${page} не існує. Всього доступно ${totalPages} сторінок.`,
    });
  }

	res.status(200).json({
	  status: 200,
	  message: 'Successfully found contacts!',
    data: {
        data,
        page: parseInt(page),
        perPage: parseInt(perPage),
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
    }
	});
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      const error = new Error('Contact not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
};

export const createContactController = async (req, res) => {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const newContact = await createContact({ name, phoneNumber, email, isFavourite, contactType });

    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: newContact,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body, { upsert: true });

    if (!updatedContact) {
      throw createHttpError(404, 'Contact not found');
    }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a contact!',
      data: updatedContact,
    });
};

export const deleteContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContactById(contactId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
};
