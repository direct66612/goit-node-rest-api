const { User } = require("../../models/userModel");

const getUserById = (id) => User.findById(id);

module.exports = { getUserById };
