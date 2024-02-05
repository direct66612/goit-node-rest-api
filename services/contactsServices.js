const { Contacts } = require("../models/contactsModel");

const listContacts = async (query) => {
  const page = query.page ? +query.page : 1;
  const limit = query.limit ? +query.limit : 3;
  const docsToSkip = (page - 1) * limit;

  const getAllContacts = Contacts.find().where(query);

  const newList = await getAllContacts.limit(limit);

  return newList;
};
const getContactById = async (contactId) => {
  const findEl = Contacts.findById(contactId);
  if (findEl === undefined) {
    return null;
  }
  return findEl;
};
const removeContact = async (contactId) => {
  const findEl = Contacts.findByIdAndDelete(contactId);
  if (findEl === undefined) {
    return null;
  }
  return findEl;
};
const addContact = async (name, email, phone, favorite) => {
  const newObj = {
    name,
    email,
    phone,
    favorite,
  };
  Contacts.create(newObj);
  return newObj;
};
const updateContactOperation = async (contactId, ...data) => {
  const findAndChangedEl = await Contacts.findByIdAndUpdate(
    contactId,
    ...data,
    {
      new: true,
    }
  );
  if (findAndChangedEl === undefined) {
    return null;
  }
  return findAndChangedEl;
};
const updateStatusContactFavorite = async (contactId, ...data) => {
  const findAndChangedEl = await Contacts.findByIdAndUpdate(
    contactId,
    ...data,
    {
      new: true,
    }
  );
  if (findAndChangedEl === undefined) {
    return null;
  }
  return findAndChangedEl;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactOperation,
  updateStatusContactFavorite,
};
