const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../services/contactsServices");

const { asyncHandler } = require("../helpers/asyncHandler");

const getAllContacts = async (req, res) => {
  res.status(200).json(await asyncHandler(listContacts));
};

const getOneContact = async (req, res) => {
  const findOneContact = await asyncHandler(getContactById, req.params.id);
  if (findOneContact) {
    return res.status(200).json(findOneContact);
  }
  return res.status(404).json({ message: "Not found" });
};

const deleteContact = async (req, res) => {
  const removeOneContact = await asyncHandler(removeContact, req.params.id);
  if (removeOneContact) {
    return res.status(200).json(removeOneContact);
  }
  return res.status(404).json({ message: "Not found" });
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
};

const updateContact = (req, res) => {};
module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
