const { User } = require("../../models/userModel");

const { signToken } = require("../jwtServices");

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new Error("Not authorized..");

  const isPasswordValid = await user.checkPassword(password, user.password);

  if (!isPasswordValid) throw new Error("Not authorized..");

  user.password = undefined;

  const token = signToken(user.id);
  user.token = token;

  await User.findByIdAndUpdate(user.id, user, { new: true });

  return { user, token };
};

module.exports = { loginUser };
