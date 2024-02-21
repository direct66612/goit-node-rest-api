const { asyncHandler } = require("../../helpers/asyncHandler");

const { updateAvatar } = require("../../services/userServices");

const userUpdateAvatar = async (req, res) => {
  try {
    const userWithNewAvatar = await updateAvatar(req.user, req.file);
    res.status(200).json({ userNewAvatar: userWithNewAvatar });
  } catch (error) {
    res.status(401).json({ msg: "Not authorized" });
  }
};

module.exports = { userUpdateAvatar };
