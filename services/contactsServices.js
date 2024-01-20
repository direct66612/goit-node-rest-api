const fs = require("fs").promises;
const { v4 } = require("uuid");
const path = require("path");
const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
  const readResult = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(readResult);
};
const getContactById = async (contactId) => {
  const readResult = await fs.readFile(contactsPath);
  const parseDate = JSON.parse(readResult);
  const findEl = parseDate.find(({ id }) => id === contactId);
  if (findEl === undefined) {
    return null;
  }
  return findEl;
};
const removeContact = async (contactId) => {
  const readResult = await fs.readFile(contactsPath);
  const parseDate = JSON.parse(readResult);
  const findEl = parseDate.find(({ id }) => id === contactId);
  const indexEl = parseDate.indexOf(findEl);
  parseDate.splice(indexEl, 1);
  if (findEl === undefined) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(parseDate, null, 2));
  return findEl;
};
const addContact = async (name, email, phone) => {
  const newObj = {
    id: v4(),
    name,
    email,
    phone,
  };
  const readResult = await fs.readFile(contactsPath);
  const parseDate = JSON.parse(readResult);
  parseDate.push(newObj);
  await fs.writeFile(contactsPath, JSON.stringify(parseDate, null, 2));
  return newObj;
};
const updateContactOperation = async (contactId, ...data) => {
  const readResult = await fs.readFile(contactsPath);
  const parseDate = JSON.parse(readResult);
  const findEl = parseDate.find(({ id }) => id === contactId);
  const indexEl = parseDate.indexOf(findEl);
  parseDate.splice(indexEl, 1);
  if (findEl === undefined) {
    return null;
  }
  const elForChange = Object.assign(findEl, ...data);
  parseDate.push(elForChange);
  await fs.writeFile(contactsPath, JSON.stringify(parseDate, null, 2));
  return elForChange;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactOperation,
};
