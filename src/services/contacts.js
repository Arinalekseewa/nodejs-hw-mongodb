import { Contact } from '../db/models/contact.model.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

   if (filter.gender) {
    contactsQuery.where('type').equals(filter.contactType);
  }
  if (filter.maxAge) {
    contactsQuery.where('favourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
