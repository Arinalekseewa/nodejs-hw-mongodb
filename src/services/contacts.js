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
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContactById = async (contactId) => {
  const deleteContact = await Contact.findOneAndDelete(
    { _id: contactId },
  );

  return deleteContact;
};