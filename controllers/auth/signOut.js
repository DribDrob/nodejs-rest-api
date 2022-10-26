const { User } = require("../../models/user");

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({ message: "" });
};

module.exports = signOut;
