const { httpError } = require("../../helpers/httpError");

const path = require("path");

const Jimp = require("jimp");

const fs = require("fs-extra");

const { User } = require("../../models/userModel");

const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (user, file) => {
  const { _id } = user;

  if (!file) {
    throw httpError(401, "Not authorized");
  }
  const { path: tempUpload, originalname } = file;

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.resolve(avatarsDir, fileName);

  await fs.copy(tempUpload, resultUpload);

  const image = await Jimp.read(resultUpload);
  image.resize(250, 250).write(resultUpload);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  return avatarURL;
};

module.exports = { updateAvatar };
