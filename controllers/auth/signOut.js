const updateUser = require("./updateUser");

const signOut = async (req, res) => {
  const { _id } = req.user;
  await updateUser(_id, { token: null });
  res.status(204).json({ message: "" });
};

module.exports = signOut;
