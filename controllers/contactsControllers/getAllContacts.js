const { asyncHandler } = require("../../helpers/asyncHandler");

const { listContacts } = require("../../services/contactsServices");

const getAllContacts = async (req, res) => {
  res.status(200).json(await asyncHandler(listContacts, req.query));
};
module.exports = { getAllContacts };
