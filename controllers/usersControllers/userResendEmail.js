const { User } = require("../../models/userModel");

const { v4 } = require("uuid");

const nodemailer = require("nodemailer");

const { userVerifyResendSchema } = require("../../schemas/usersSchemas");

const userResendEmail = async (req, res) => {
  const { value, error } = userVerifyResendSchema(req.body);
  try {
    if (error)
      return res.status(400).json({ message: "missing required field email" });
    const { email } = value;

    const user = await User.findOne({ email });

    if (!user) throw Error(404, "User Not found");

    const isVerify = user.verify;

    if (isVerify)
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });

    const newObj = await User.findByIdAndUpdate(
      user._id,
      {
        verify: false,
        verificationToken: v4(),
      },
      { new: true }
    );

    const emailTransporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const emailConfig = {
      from: "Admin <admin@example.com>",
      to: email,
      subject: "Verification email",
      html: `<a href=localhost:3001/users/verify/${newObj.verificationToken}>Please verification email</a>`,
      text: `localhost:3001/users/verify/${newObj.verificationToken}`,
    };

    await emailTransporter.sendMail(emailConfig);
    return res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    res.status(404).json({ message: "user not found" });
  }
};

module.exports = { userResendEmail };
