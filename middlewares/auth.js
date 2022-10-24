const { requestError } = require("../utils");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw requestError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw requestError(401);
    }
    // add user to request data
    req.user = user;
    next();
  } catch (err) {
    if (!err.status) {
      err.status = 401;
      err.message = "Not authorized";
    }
    next(err);
  }
};
module.exports = auth;
