const {
  listContacts,
  getContactById,
} = require("../services/contactsServices");

const getAllContacts = (req, res) => {
  listContacts();
};

const getOneContact = (req, res) => {};

const deleteContact = (req, res) => {};

const createContact = (req, res) => {};

const updateContact = (req, res) => {};
module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
