const express = require("express");
const router = express.Router();
const contacts = require("../../model");
const {
  validationAddContact,
  validationUpdateContact,
  validationObjectId,
  validateUpdateContactFav,
} = require("./validationContacts");

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();
  try {
    return res.status(200).json({
      data,
      message: "data loaded",
      status: "success",
      code: "200",
    });
  } catch (err) {
    return res.status(400).json({
      message: "data is empty",
      status: "error",
      code: "400",
    });
  }
});

router.get("/:contactId", validationObjectId, async (req, res, next) => {
  try {
    const data = await contacts.getContactById(req.params.contactId);
    if (data) {
      return res.status(200).json({
        data,
        message: "data loaded",
        status: "success",
        code: "200",
      });
    } else {
      return res.status(404).json({
        message: "Not found",
        status: "error",
        code: "404",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", validationAddContact, async (req, res, next) => {
  try {
    const data = await contacts.addContact(req.body);
    return res.status(201).json({
      data,
      message: "contact created",
      status: "success",
      code: "201",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "missing required name field",
      status: "error",
      code: "400",
    });
  }
});

router.delete("/:contactId", validationObjectId, async (req, res, next) => {
  try {
    const data = await contacts.removeContact(req.params.contactId);
    if (data) {
      return res.status(200).json({
        data,
        message: "contact deleted",
        status: "success",
        code: "200",
      });
    } else {
      return res.status(404).json({
        message: "Not found",
        status: "error",
        code: "404",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/:contactId/favorite",
  validateUpdateContactFav,
  validationObjectId,
  async (req, res, next) => {
    try {
      const data = await contacts.updateContact(req.params.contactId, req.body);
      if (data) {
        return res.status(200).json({
          data,
          message: "contact update",
          status: "success",
          code: "200",
        });
      } else {
        return res.status(404).json({
          message: "Not found",
          status: "error",
          code: "404",
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:contactId",
  validationUpdateContact,
  validationObjectId,
  async (req, res, next) => {
    try {
      const data = await contacts.updateContact(req.params.contactId, req.body);
      if (data) {
        return res.status(200).json({
          data,
          message: "contact update",
          status: "success",
          code: "200",
        });
      } else {
        return res.status(404).json({
          message: "Not found",
          status: "error",
          code: "404",
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
