import { Contact } from '../db/models/contact.model.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();

  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  return contact;
};

export const createContact = async ({ name, phoneNumber, email, isFavourite, contactType }) => {
  const contact = await Contact.create({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      ...options,
    }
  );

  return updatedContact;
};


export const deleteContactById = async (contactId) => {
  const deleteContact = await Contact.findOneAndDelete(
    { _id: contactId },
  );

  return deleteContact;
};