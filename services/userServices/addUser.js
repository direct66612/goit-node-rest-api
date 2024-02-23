const { User } = require("../../models/userModel");

const { v4 } = require("uuid");

const addUser = async (email, password, subscription) => {
  const newObj = {
    email,
    password,
    subscription,
    verificationToken: v4(),
  };
  await User.create(newObj);
  newObj.password = undefined;
  return newObj;
};

module.exports = { addUser };
