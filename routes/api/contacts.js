const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, auth } = require("../../middlewares");
const { ctrlWrapper } = require("../../utils");
const { addSchema, updateFavoriteSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, validateBody(addSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  auth,
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validateBody(updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
