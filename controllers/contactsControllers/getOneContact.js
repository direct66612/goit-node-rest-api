const { asyncHandler } = require("../../helpers/asyncHandler");

const { getContactById } = require("../../services/contactsServices");

const getOneContact = async (req, res) => {
  const findOneContact = await asyncHandler(getContactById, req.params.id);
  if (findOneContact) {
    return res.status(200).json(findOneContact);
  }
  return res.status(404).json({ message: "Not found" });
};

module.exports = { getOneContact };
