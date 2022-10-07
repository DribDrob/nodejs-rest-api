const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { ctrlWrapper } = require("../../utils");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validateBody("missing required name field"),
  ctrlWrapper(ctrl.add)
);

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  validateBody("missing fields"),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
