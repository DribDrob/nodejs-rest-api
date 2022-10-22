const { Contact } = require("../../models/contact");
const { requestError } = require("../../utils");

const deleteById = async (req, res) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
