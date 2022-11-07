const { requestError } = require("../../utils");
const updateContact = require("./updateContact");

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateById;
