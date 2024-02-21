const { getUserById } = require("./getUserById");

const { getUserByIdAndDeleteToken } = require("./getUserByIdAndDeleteToken");

const { addUser } = require("./addUser");

const { loginUser } = require("./loginUser");

const { updateAvatar } = require("./updateAvatar");

module.exports = {
  getUserById,
  addUser,
  loginUser,
  getUserByIdAndDeleteToken,
  updateAvatar,
};
