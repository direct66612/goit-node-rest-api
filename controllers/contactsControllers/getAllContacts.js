const { asyncHandler } = require("../../helpers/asyncHandler");

const { listContacts } = require("../../services/contactsServices");

const { checkToken } = require("../../services/jwtServices/checkToken");

const getAllContacts = async (req, res) => {
  try {
    const currentUser = checkToken(req.user.token);
    if (!currentUser) throw Error("Unauthorized");
    const { total, allContacts } = await asyncHandler(
      listContacts,
      req.query,
      req.user
    );
    res.status(200).json({ total, allContacts });
  } catch (error) {
    res.status(401).json({
      Status: "401 Unauthorized",
      ResponseBody: {
        message: "User Unauthorized",
      },
    });
  }
};
module.exports = { getAllContacts };
