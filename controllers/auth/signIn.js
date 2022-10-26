const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { requestError } = require("../../utils");
const { SECRET_KEY } = process.env;

const signIn = async (req, res) => {
  const { email, password } = req.body;
  // is email in database?
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, "Email or password wrong");
  }
  // is password valid?
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw requestError(401, "Email or password is wrong");
  }
  // create token
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  // response
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = signIn;
