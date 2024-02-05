const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("./envs/env");

const { contactsRouter } = require("./routes/contactsRouter");
const { usersRouter } = require("./routes/usersRouter");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Oops! Resource not found!",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running. Use our API on port: ${process.env.PORT}`);
});
