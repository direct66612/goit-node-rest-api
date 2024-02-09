const { User } = require("../../models/userModel");

const addUser = async (email, password, subscription) => {
  const newObj = {
    email,
    password,
    subscription,
  };
  await User.create(newObj);
  newObj.password = undefined;
  return newObj;
};

module.exports = { addUser };
