const { Contacts } = require("../../models/contactsModel");

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

module.exports = { updateStatusContactFavorite };
