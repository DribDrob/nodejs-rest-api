const { Contact } = require("../../models/contact");
const { requestError } = require("../../utils");

const updateById = async (req, res) => {
  const id = req.params.contactId;
  // { new: true } return updated object
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateById;
