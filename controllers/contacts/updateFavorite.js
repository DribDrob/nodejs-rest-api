const { Contact } = require("../../models/contact");
const { requestError } = require("../../utils");

async function updateStatusContact(contactId, body) {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
}

const updateFavorite = async (req, res) => {
  const id = req.params.contactId;
  const result = await updateStatusContact(id, req.body);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateFavorite;
