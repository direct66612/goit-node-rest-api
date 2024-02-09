const { asyncHandler } = require("../../helpers/asyncHandler");

const { removeContact } = require("../../services/contactsServices");

const deleteContact = async (req, res) => {
  const removeOneContact = await asyncHandler(removeContact, req.params.id);
  if (removeOneContact) {
    return res.status(200).json(removeOneContact);
  }
  return res.status(404).json({ message: "Not found" });
};

module.exports = { deleteContact };
