const { listContacts } = require("./listContacts");

const { getContactById } = require("./getContactsById");

const { removeContact } = require("./removeContact");

const { addContact } = require("./addContact");

const { updateContactOperation } = require("./updateContactOperation");

const {
  updateStatusContactFavorite,
} = require("./updateStatusContactFavorite");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactOperation,
  updateStatusContactFavorite,
};
