const jwt = require("jsonwebtoken");

const checkToken = (token) => {
  if (!token) throw new Error("Unauthorized");
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    return id;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

module.exports = { checkToken };
