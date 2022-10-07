const contacts = require("../../models/contacts");
const { requestError } = require("../../utils");

const getById = async (req, res) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json(result);
};
module.exports = getById;
