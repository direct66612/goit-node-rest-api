const { Contacts } = require("../../models/contactsModel");

const addContact = async (name, email, phone, favorite) => {
  const newObj = {
    name,
    email,
    phone,
    favorite,
  };
  Contacts.create(newObj);
  return newObj;
};

module.exports = { addContact };
