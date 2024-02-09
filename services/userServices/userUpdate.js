const { User } = require("../../models/userModel");

const userUpdate = async (id, subscription) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  return updatedUser;
};

module.exports = { userUpdate };
