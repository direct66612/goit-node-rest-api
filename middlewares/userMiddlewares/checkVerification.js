const { User } = require("../../models/userModel");
const { registerSchema } = require("../../schemas/usersSchemas");

const checkVerification = async (req, res, next) => {
  const { value, error } = registerSchema(req.body);
  const { email } = value;
  const user = await User.findOne({ email });

  const isVerify = await user.verify;

  if (!isVerify) res.status(401).json({ message: "please verification email" });

  next();
};

module.exports = { checkVerification };
