const express = require("express");
const joi = require("joi");

const contacts = require("../../models/contacts");
const { requestError } = require("../../utils");
const router = express.Router();

const validateSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().min(5).email({ minDomainSegments: 2 }).required(),
  phone: joi.string().min(3).required(),
});
// const updateSchema = joi.object({
//   name: joi.string().required(),
//   email: joi.string().required(),
//   phone: joi.string().required(),
// });

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      throw requestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      throw requestError(400, "missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) {
      throw requestError(404, "Not found");
    }
    // res.json(result);
    // res.json({ message: "Delete success" });
    res.status(200).res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      throw requestError(400, "missing fields");
    }
    const id = req.params.contactId;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw requestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
