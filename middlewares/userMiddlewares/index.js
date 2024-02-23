const { protect } = require("./protect");

const { userLogout } = require("./userLogout");

const { userCurrent } = require("./userCurrent");

const { allowFor } = require("./allowFor");

const { uploadAvatar } = require("./uploadAvatar");

const { checkVerification } = require("./checkVerification");

module.exports = {
  protect,
  userLogout,
  userCurrent,
  allowFor,
  uploadAvatar,
  checkVerification,
};
