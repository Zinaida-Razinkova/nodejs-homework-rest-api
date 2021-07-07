const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../model/contacts");

const getAllContactsContr = async (req, res) => {
  const contacts = await listContacts(req.user.id, req.query);
  res.status(200).json({ ...contacts, status: "success" });
};

const getContactByIdContr = async (req, res) => {
  const contact = await getContactById(req.user.id, req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ contact, status: "success" });
};

const addContactContr = async (req, res) => {
  const contact = await addContact(req.user.id, req.body);
  res.status(201).json({ contact, status: "success" });
};

const deleteContactContr = async (req, res) => {
  const result = await removeContact(req.user.id, req.params.contactId);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
};

const updateContactContr = async (req, res) => {
  const contact = await updateContact(
    req.user.id,
    req.params.contactId,
    req.body
  );
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ contact, status: "success" });
};

const updateStatusContactContr = async (req, res) => {
  const contact = await updateStatusContact(
    req.user.id,
    req.params.contactId,
    req.body
  );

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ contact, status: "success" });
};

module.exports = {
  getAllContactsContr,
  getContactByIdContr,
  addContactContr,
  deleteContactContr,
  updateStatusContactContr,
  updateContactContr,
};
