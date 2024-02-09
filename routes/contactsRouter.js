const express = require("express");
const { protect } = require("../middlewares/userMiddlewares");

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.use(protect);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

contactsRouter.patch("/:id/favorite", updateStatusContact);
module.exports = { contactsRouter };
