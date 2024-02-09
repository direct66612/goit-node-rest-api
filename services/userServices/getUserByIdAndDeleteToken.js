const { User } = require("../../models/userModel");

const getUserByIdAndDeleteToken = async (id) => {
  const updatedUser = await User.findById(id);
  updatedUser.token = null;
  await updatedUser.save();
  return updatedUser;
};

module.exports = { getUserByIdAndDeleteToken };
