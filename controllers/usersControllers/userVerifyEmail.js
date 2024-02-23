const { httpError } = require("../../helpers/httpError");
const { User } = require("../../models/userModel");

const userVerifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw Error(404, "User Not found");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({ message: "verification successful" });
};

module.exports = { userVerifyEmail };
