const { checkToken } = require("../../services/jwtServices");
const { getUserById } = require("../../services/userServices");

const userCurrent = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];
  try {
    const userId = checkToken(token);
    const { email, subscription } = await getUserById(userId);
    res.status(200).json({
      Status: "200 OK",
      ContentType: "application/json",
      ResponseBody: {
        email,
        subscription,
      },
    });
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

module.exports = { userCurrent };
