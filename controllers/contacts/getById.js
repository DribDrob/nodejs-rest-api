const { Contact } = require("../../models/contact");
const { requestError } = require("../../utils");

const getById = async (req, res) => {
  const result = await Contact.findById(
    req.params.contactId,
    "-createdAt -updatedAt"
  );
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json(result);
};
module.exports = getById;
