const { getAllContacts } = require("./getAllContacts");

const { getOneContact } = require("./getOneContact");

const { deleteContact } = require("./deleteContact");

const { createContact } = require("./createContact");

const { updateContact } = require("./updateContact");

const { updateStatusContact } = require("./updateStatusContact");

const { updateStatusContactSchema } = require("../../schemas/contactsSchemas");

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
