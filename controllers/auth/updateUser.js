const { User } = require("../../models/user");

async function updateUser(userId, body) {
  return await User.findByIdAndUpdate(userId, body, { new: true });
}

module.exports = updateUser;
