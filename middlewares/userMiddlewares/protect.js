const { checkToken } = require("../../services/jwtServices");

const { getUserById } = require("../../services/userServices");

const protect = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];
  try {
    const userId = checkToken(token);

    if (!userId)
      res.status(401).json({
        Status: "401 Unauthorized",
        ContentType: "application/json",
        ResponseBody: {
          message: "Not authorized",
        },
      });

    const currentUser = await getUserById(userId);

    if (!currentUser)
      res.status(401).json({
        Status: "401 Unauthorized",
        ContentType: "application/json",
        ResponseBody: {
          message: "Not authorized",
        },
      });

    req.user = currentUser;

    next();
  } catch (error) {
    res.status(401).json({ Status: "401 Unauthorized" });
  }
};

module.exports = { protect };
