const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactOperation,
} = require("../services/contactsServices");

const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");

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
  const { value, error } = createContactSchema(req.body);
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
  const { name, email, phone } = value;
  const newObj = await asyncHandler(addContact, name, email, phone);
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
module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
