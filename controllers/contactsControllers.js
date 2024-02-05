const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactOperation,
  updateStatusContactFavorite,
} = require("../services/contactsServices");

const {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require("../schemas/contactsSchemas");

const { asyncHandler } = require("../helpers/asyncHandler");
const { Contacts } = require("../models/contactsModel");

const getAllContacts = async (req, res) => {
  res.status(200).json(await asyncHandler(listContacts, req.query));
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
  const { value, error } = createContactSchema(req.body);
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
  const userExists = await Contacts.exists({ email: value.email });
  if (userExists)
    return res.status(409).json("User with this email already exists..");
  const { name, email, phone, favorite } = value;
  const newObj = await asyncHandler(addContact, name, email, phone, favorite);
  return res.status(201).json(newObj);
};

const updateContact = async (req, res) => {
  const { value, error } = updateContactSchema(req.body);
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
  if (Object.keys(value).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }
  const newObj = await asyncHandler(
    updateContactOperation,
    req.params.id,
    value
  );
  if (!newObj) return res(404).json({ message: "Not found" });
  res.status(200).json(newObj);
};
const updateStatusContact = async (req, res) => {
  const { value, error } = updateStatusContactSchema(req.body);
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
  const newEl = await asyncHandler(
    updateStatusContactFavorite,
    req.params.id,
    value
  );
  if (!newEl) return res.status(404).json({ message: "Not found" });
  res.status(200).json(newEl);
};
module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
