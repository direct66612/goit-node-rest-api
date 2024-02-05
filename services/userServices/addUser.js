const { User } = require("../../models/userModel");

const addUser = async (email, password) => {
  const newObj = {
    email,
    password,
  };
  await User.create(newObj);
  newObj.password = undefined;
  return newObj;
};

module.exports = { addUser };
