const { requestError } = require("../../utils");
const updateUser = require("./updateUser");

const updateSubscription = async (req, res) => {
  const { _id: id } = req.user;

  const result = await updateUser(id, req.body);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateSubscription;
