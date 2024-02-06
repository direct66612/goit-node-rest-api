const { checkToken } = require("../../services/jwtServices");

const { getUserByIdAndDeleteToken } = require("../../services/userServices");

const userLogout = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];
  try {
    const userId = checkToken(token);
    await getUserByIdAndDeleteToken(userId);

    res.sendStatus(204);
    next();
    if (!userId)
      res.status(401).json({
        Status: "401 Unauthorized",
        ContentType: "application/json",
        ResponseBody: {
          message: "Not authorized",
        },
      });
  } catch (error) {
    res.status(401).json({
      Status: "401 Unauthorized",
      ContentType: "application/json",
      ResponseBody: {
        message: "Not authorized",
      },
    });
  }
};

module.exports = { userLogout };
