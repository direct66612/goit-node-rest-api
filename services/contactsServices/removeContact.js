const { Contacts } = require("../../models/contactsModel");

const removeContact = async (contactId) => {
  const findEl = Contacts.findByIdAndDelete(contactId);
  if (findEl === undefined) {
    return null;
  }
  return findEl;
};

module.exports = { removeContact };
