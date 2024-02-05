const { asyncHandler } = require("../../helpers/asyncHandler");

const { updateContactOperation } = require("../../services/contactsServices");

const { updateContactSchema } = require("../../schemas/contactsSchemas");

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

module.exports = { updateContact };
