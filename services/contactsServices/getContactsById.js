const { Contacts } = require("../../models/contactsModel");

const getContactById = async (contactId) => {
  const findEl = Contacts.findById(contactId);
  if (findEl === undefined) {
    return null;
  }
  return findEl;
};

module.exports = { getContactById };
