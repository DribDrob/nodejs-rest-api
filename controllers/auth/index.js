const signUp = require("./signUp");
const signIn = require("./signIn");
const signOut = require("./signOut");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendEmail = require("./resendEmail");

module.exports = {
  signUp,
  signIn,
  signOut,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verify,
  resendEmail,
};
