const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

const checkToken = (token) => {
  if (!token) throw new Error("Unauthorized");
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    return id;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

module.exports = {
  signToken,
  checkToken,
};
