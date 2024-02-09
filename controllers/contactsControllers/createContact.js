const { asyncHandler } = require("../../helpers/asyncHandler");

const { addContact } = require("../../services/contactsServices");

const { Contacts } = require("../../models/contactsModel");

const { createContactSchema } = require("../../schemas/contactsSchemas");

const createContact = async (req, res) => {
  const { value, error } = createContactSchema(req.body);
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
  const userExists = await Contacts.exists({ email: value.email });
  if (userExists)
    return res.status(409).json("User with this email already exists..");
  const { name, email, phone, favorite, owner } = value;
  const newObj = await asyncHandler(
    addContact,
    name,
    email,
    phone,
    favorite,
    req.user
  );
  return res.status(201).json(newObj);
};

module.exports = { createContact };
