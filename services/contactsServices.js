const fs = require("fs/promises");
const { v4 } = require("uuid");
const path = require("path");
const contactsPath = path.join("db", "contacts.json");
const listContacts = async () => {
  try {
    const readResult = await fs.readFile(contactsPath);
    return readResult.toString();
  } catch (err) {
    console.log(err);
  }
};
const getContactById = async (contactId) => {
  try {
    const readResult = await fs.readFile(contactsPath);
    const parseDate = JSON.parse(readResult);
    const findEl = parseDate.find(({ id }) => id === contactId);
    if (findEl === undefined) {
      return null;
    }
    return findEl;
  } catch (err) {
    console.log(err);
  }
};
const removeContact = async (contactId) => {
  try {
    const readResult = await fs.readFile(contactsPath);
    const parseDate = JSON.parse(readResult);
    const findEl = parseDate.find(({ id }) => id === contactId);
    const indexEl = parseDate.indexOf(findEl);
    parseDate.splice(indexEl, 1);
    if (findEl === undefined) {
      return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(parseDate));
    return findEl;
  } catch (err) {
    console.log(err);
  }
};
const addContact = async (name, email, phone) => {
  const newObj = {
    id: v4(),
    name,
    email,
    phone,
  };
  try {
    const readResult = await fs.readFile(contactsPath);
    const parseDate = JSON.parse(readResult);
    parseDate.push(newObj);
    await fs.writeFile(contactsPath, JSON.stringify(parseDate));
    return newObj;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { listContacts, getContactById, removeContact, addContact };
