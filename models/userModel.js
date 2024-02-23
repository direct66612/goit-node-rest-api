const { model, Schema } = require("mongoose");
const { compare, genSalt, hash } = require("bcrypt");
const gravatar = require("gravatar");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (this.isNew)
    this.avatarURL = gravatar.url(this.email, {
      protocol: "https",
      d: "robohash",
    });

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);

  next();
});

userSchema.methods.checkPassword = (candidate, passwordHash) =>
  compare(candidate, passwordHash);

const User = model("User", userSchema);

module.exports = { User };
