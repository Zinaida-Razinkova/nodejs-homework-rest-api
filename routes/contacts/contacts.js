const express = require("express");
const router = express.Router();

const {
  getAllContactsContr,
  getContactByIdContr,
  addContactContr,
  deleteContactContr,
  updateStatusContactContr,
  updateContactContr,
} = require("../../controllers/contacts");

const {
  validationAddContact,
  validationUpdateContact,
  validationObjectId,
  validateUpdateContactFav,
  validationQueryContacts,
} = require("./validationContacts");
const guard = require("../../helpers/guard");

router
  .get("/", guard, validationQueryContacts, getAllContactsContr)
  .post("/", guard, validationAddContact, addContactContr);

router
  .get("/:contactId", guard, validationObjectId, getContactByIdContr)
  .delete("/:contactId", guard, validationObjectId, deleteContactContr)
  .put(
    "/:contactId",
    guard,
    validationUpdateContact,
    validationObjectId,
    updateContactContr
  );

router.patch(
  "/:contactId/favorite",
  guard,
  validateUpdateContactFav,
  validationObjectId,
  updateStatusContactContr
);

module.exports = router;
