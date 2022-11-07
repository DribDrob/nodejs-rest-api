const { Contact } = require("../../models/contact");

async function updateContact(contactId, body) {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
}

module.exports = updateContact;
