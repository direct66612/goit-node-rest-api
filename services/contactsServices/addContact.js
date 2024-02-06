const { Contacts } = require("../../models/contactsModel");

const addContact = async (name, email, phone, favorite, owner) => {
  const newObj = {
    name,
    email,
    phone,
    favorite,
    owner,
  };
  Contacts.create(newObj);
  newObj.owner.password = undefined;
  newObj.owner.token = undefined;
  newObj.owner.email = undefined;
  return newObj;
};

module.exports = { addContact };
