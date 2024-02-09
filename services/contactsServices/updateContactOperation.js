const { Contacts } = require("../../models/contactsModel");

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

module.exports = { updateContactOperation };
