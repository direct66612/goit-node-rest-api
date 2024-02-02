const dotenv = require("dotenv");

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./envs/production.env"
      : "./envs/dev.env",
});
