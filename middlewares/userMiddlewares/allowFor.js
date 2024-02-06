const allowFor =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.subscription)) return next();

    next(new Error("You are not allowed to perform this action.."));
  };

module.exports = { allowFor };
