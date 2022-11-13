const { User } = require("../../models/user");
const { requestError } = require("../../utils");
const updateUser = require("./updateUser");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw requestError(404, "User not found");
  }
  await updateUser(user._id, { verify: true, verificationToken: null });
  res.json({ message: "Verification successful" });
};

module.exports = verify;
