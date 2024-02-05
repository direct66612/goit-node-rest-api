const { Contacts } = require("../../models/contactsModel");

const listContacts = async (query) => {
  const getAllContacts = Contacts.find().where(query);

  const page = query.page ? +query.page : 1;
  const limit = query.limit ? +query.limit : 3;
  const docsToSkip = (page - 1) * limit;

  // getAllContacts.skip(docsToSkip).limit(limit);

  const newList = await getAllContacts;

  return newList;
};

module.exports = { listContacts };
