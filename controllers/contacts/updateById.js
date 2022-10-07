const contacts = require("../../models/contacts");
const { requestError } = require("../../utils");

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateById;
