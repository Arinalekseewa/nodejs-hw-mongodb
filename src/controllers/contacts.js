import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContactById
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
	  const contacts = await getAllContacts();

	  res.status(200).json({
	    status: 200,
	    message: 'Successfully found contacts!',
	    data: contacts,
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
