const { Contacts } = require("../../models/contactsModel");

const listContacts = async (query, currentUser) => {
  const findOptions = query.favorite
    ? {
        owner: currentUser,
        favorite: query.favorite,
      }
    : { owner: currentUser };
  const getAllContacts = Contacts.find(findOptions);

  const page = query.page ? +query.page : 1;
  const limit = query.limit ? +query.limit : 10;
  const docsToSkip = (page - 1) * limit;

  getAllContacts.skip(docsToSkip).limit(limit);

  const allContacts = await getAllContacts;

  const total = await Contacts.countDocuments(findOptions);

  return { allContacts, total };
};

module.exports = { listContacts };
