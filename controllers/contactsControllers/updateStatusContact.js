const { asyncHandler } = require("../../helpers/asyncHandler");

const {
  updateStatusContactFavorite,
} = require("../../services/contactsServices");

const { updateStatusContactSchema } = require("../../schemas/contactsSchemas");

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

module.exports = { updateStatusContact };
